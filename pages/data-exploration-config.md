---
layout: documentation
permalink: /data-exploration-config # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: Data configuration
description: How to configure the data pages of your site
sideNavigation: sideNavigation.guides
toc: true
---
# Configuration of data widgets

The data pages of a hosted portal (occurrence search, datasets, collections and so on) are a single JavaScript application that GBIF maintains. You configure it with a `siteConfig` object in `/_includes/js/config.js`.

This page describes **version 3** of that configuration, which is the format the current library uses.

Older configurations (`version: 2`, or no version at all) still work. The library converts them on the fly and logs the result to the browser console as `Converted config to version 3:`. The easiest way to upgrade is to open a page on your site, copy that object from the developer console into `config.js`, and tidy it up using this page. Delete `languages` and `theme` from the copy, as the theme sets those for you, and remove anything that is `undefined`. See [Moving from version 2](#moving-from-version-2) for what changed.
{: .notification .is-info}

## A complete example

Below is a site that only shows specimens held by collections in GRSciColl. It is a long example to show what is possible; most sites need far less. Everything you leave out falls back to a sensible default.

```js
var siteConfig = {
  version: 3, // required, or the config is treated as an old one and converted

  // Which data pages exist on your site. Links to pages not listed here go to GBIF.org instead.
  pages: [
    { id: 'occurrenceSearch', path: 'specimen/search' }, // a custom path
    { id: 'occurrenceKey', path: 'specimen/:key' },
    { id: 'collectionSearch' }, // default path: /collection/search
    { id: 'collectionKey' },
    { id: 'institutionSearch' },
    { id: 'institutionKey' },
    { id: 'datasetKey' },
    { id: 'publisherKey' }
  ],

  // Which catalogues are shown in the catalogue menu
  availableCatalogues: ['OCCURRENCE', 'COLLECTION', 'INSTITUTION'],

  // Which taxonomy to use. See "Taxonomy" further down.
  defaultChecklistKey: '7ddf754f-d193-4cc9-b351-99906754a03b', // Catalogue of Life

  disableInlineTableFilterButtons: false, // set to true to remove the option to add filters by clicking table cells

  occurrenceSearch: {
    // The data scope. Users can never see data outside it.
    scope: {
      type: 'and',
      predicates: [
        {
          type: 'or',
          predicates: [
            { type: 'isNotNull', key: 'institutionKey' },
            { type: 'isNotNull', key: 'collectionKey' }
          ]
        },
        {
          type: 'in',
          key: 'basisOfRecord',
          values: ['PRESERVED_SPECIMEN', 'FOSSIL_SPECIMEN', 'MATERIAL_SAMPLE', 'LIVING_SPECIMEN']
        }
      ]
    },
    excludedFilters: ['occurrenceStatus', 'networkKey', 'hostingOrganizationKey', 'protocol', 'publishingCountry', 'institutionCode', 'collectionCode'],
    highlightedFilters: ['taxonKey', 'verbatimScientificName', 'institutionKey', 'collectionKey', 'catalogNumber', 'recordedBy', 'identifiedBy'],
    defaultEnabledTableColumns: ['features', 'institutionKey', 'collectionKey', 'catalogNumber', 'country', 'year', 'recordedBy', 'identifiedBy'],
    tabs: ['table', 'map', 'gallery', 'datasets', 'download'], // lower case
    defaultTab: 'table',
    mapSettings: {
      lat: 0,
      lng: 0,
      zoom: 0
    }
  },

  collectionSearch: {
    scope: { displayOnNHCPortal: true } // query parameters for the GRSciColl collection API
  },

  institutionSearch: {
    scope: { displayOnNHCPortal: true, active: true }
  },

  // The occurrence tab shown on a collection page
  collectionKey: {
    occurrenceSearch: {
      tabs: ['table', 'map', 'gallery', 'download']
    }
  },

  apiKeys: {
    maptiler: 'GET_YOUR_OWN_TOKEN' // https://github.com/gbif/hosted-portals/issues/229
  },

  maps: {
    mapStyles: {
      defaultProjection: 'MERCATOR',
      defaultMapStyle: 'BRIGHT',
      options: {
        ARCTIC: ['NATURAL', 'BRIGHT'],
        PLATE_CAREE: ['NATURAL', 'BRIGHT', 'DARK'],
        MERCATOR: ['NATURAL', 'BRIGHT', 'SATELLITE', 'DARK'],
        ANTARCTIC: ['NATURAL', 'BRIGHT', 'DARK']
      }
    }
  },

  // Overwrite translations, per language
  messages: {
    en: { 'catalogues.occurrences': 'Specimens' }
  }
};
```

Your data scope is unlikely to change very often, so we can help configuring it if you need help.
{: .notification .is-info}

### What the theme fills in for you

The theme passes a few things to the library on top of your `siteConfig`, so you don't need to set them:

* `languages`: built from `_data/languages.yml`. Don't set `languages` in `siteConfig`, it would replace the theme's.
* `theme`: the primary colour and corner style from your site styling. You can still add `theme: { ... }` to `siteConfig` to override or extend it.
* `linkToGbifOrg: true`.

## Pages

`pages` lists the data pages your site has. Each entry has an `id` and, optionally, a `path`. Write paths without a leading slash (`specimen/search`, not `/specimen/search`). Paths can contain `:key`, which is replaced with the identifier of the record.

```js
var siteConfig = {
  version: 3,
  pages: [
    { id: 'occurrenceSearch' },                    // served at /occurrence/search
    { id: 'datasetKey', path: 'our-data/:key' }    // a custom path
  ]
};
```

Pages that are not listed are not part of your site. Links to them, for example a link to a publisher from a dataset page, go to the page on GBIF.org instead. If you leave out `pages` altogether, every page the library has is enabled, including ones that don't belong on a hosted portal, so always list your pages.

Hosted portals support the pages in the table below: occurrences, datasets, publishers, collections, institutions and literature. The library has other pages too (taxa, countries, participants, networks, installations and more), but they are not supported on hosted portals.

| id | default path |
|----|--------------|
| `occurrenceSearch` | `/occurrence/search` |
| `occurrenceKey` | `/occurrence/:key` |
| `datasetSearch` | `/dataset/search` |
| `datasetKey` | `/dataset/:key` |
| `publisherSearch` | `/publisher/search` |
| `publisherKey` | `/publisher/:key` |
| `collectionSearch` | `/collection/search` |
| `collectionKey` | `/collection/:key` |
| `institutionSearch` | `/institution/search` |
| `institutionKey` | `/institution/:key` |
| `literatureSearch` | `/literature/search` |

### A Jekyll page for each data page

The application only runs on pages that include it, so every page you enable also needs a markdown file whose `permalink` matches the path. For example, to add collection search create `collection.md`:

```yml
---
permalink: /collection/search # must match the path of the page in siteConfig
layout: collection-search # any of the data layouts will do, they all load the same application

# the rest is just the usual front matter
title: Collection
description: Explore our collections
lang-ref: collection
---
```

The available layouts are: `occurrence`, `occurrence-key`, `dataset`, `dataset-key`, `publisher`, `publisher-key`, `collection-search`, `collection-key`, `institution-search`, `institution-key`, `literature` and `widget`. They differ only in name, so use the one that fits, or `widget` for page types without a layout of their own.

Pages that show a single record (`:key` pages) are generated once, with `_key_` in the permalink, for example `permalink: /collection/_key_`. The web server then has to send every `/collection/<some key>` request to that file (see `serve.json` in the theme for how it is done locally). Let us know if you add a new type of key page.

## Data scope

Each search can be limited with a `scope`.

The format depends on the search:

* `occurrenceSearch` and `literatureSearch` take a **predicate**, as described in the [GBIF API documentation](https://techdocs.gbif.org/en/openapi/v1/occurrence#/Searching%20occurrences). Keys are written in `camelCase` (as in the query parameters of the API) rather than `CONSTANT_CASE`, so `basisOfRecord` instead of `BASIS_OF_RECORD`.
* `datasetSearch`, `publisherSearch`, `collectionSearch` and `institutionSearch` take an object of **query parameters** for the corresponding GBIF API, for example `{ type: 'CHECKLIST' }` for datasets or `{ country: 'DK' }` for publishers.

A predicate scope is always applied on top of what the user searches for, so users cannot get outside it. A query parameter scope is not: if a user adds a filter on the same parameter, theirs replaces the scope. Add the parameters in your scope to `excludedFilters` for that search, e.g. `publisherSearch: { scope: { country: 'DK' }, excludedFilters: ['country'] }`.

A site that only shows fungi:

```js
var siteConfig = {
  version: 3,
  defaultChecklistKey: '7ddf754f-d193-4cc9-b351-99906754a03b', // Catalogue of Life
  occurrenceSearch: {
    scope: { type: 'equals', key: 'taxonKey', value: 'F' } // Fungi in Catalogue of Life
  }
};
```

Taxon keys depend on which taxonomy you use. Read [Taxonomy](#taxonomy) before you scope by taxon.
{: .notification .is-warning}

A literature scope:

```js
var siteConfig = {
  version: 3,
  literatureSearch: {
    scope: {
      type: 'or',
      predicates: [
        { type: 'in', key: 'countriesOfResearcher', values: ['US', 'UM', 'AS', 'FM', 'GU', 'MH', 'MP', 'PR', 'PW', 'VI'] },
        { type: 'in', key: 'countriesOfCoverage', values: ['US', 'UM', 'AS', 'FM', 'GU', 'MH', 'MP', 'PR', 'PW', 'VI'] }
      ]
    },
    highlightedFilters: ['q', 'countriesOfResearcher', 'countriesOfCoverage', 'year']
  }
};
```

## Taxonomy

GBIF has two taxonomies that occurrences are matched against:

* the **GBIF Backbone Taxonomy**, `d7dddbf4-2cf0-4f39-9b2a-bb099caae36c`, the one GBIF has used for years. Its taxon keys are numbers, e.g. Fungi is `5`.
* the **Catalogue of Life** (COL), `7ddf754f-d193-4cc9-b351-99906754a03b`, the new taxonomy. Its taxon keys are short codes, e.g. Fungi is `F`.

Every occurrence is interpreted against both, so the names, classification and taxon keys you see on a record depend on which one is active. Unless you configure otherwise, hosted portals use the GBIF Backbone.

If your site already uses the Backbone, read [Moving to Catalogue of Life](/catalogue-of-life-migration) before you switch.
{: .notification .is-info}

### Choosing a taxonomy

```js
var siteConfig = {
  version: 3,
  // the taxonomy used for names, classifications, taxon filters, charts and your scope
  defaultChecklistKey: '7ddf754f-d193-4cc9-b351-99906754a03b' // Catalogue of Life
};
```

Leave `defaultChecklistKey` out to keep the GBIF Backbone.

### Taxon keys are not interchangeable

A taxon key only means something together with its taxonomy. `taxonKey: 5` is Fungi in the Backbone but does not exist in Catalogue of Life, and `taxonKey: 'F'` is the other way round. If your scope uses Backbone keys and you switch `defaultChecklistKey` to Catalogue of Life, your scope will match nothing (or, worse, something else).

When you change taxonomy, look up the new key for every taxon in your scope:

* search the name in the [Catalogue of Life](https://www.catalogueoflife.org/data/search) or on GBIF.org with the Catalogue of Life taxonomy selected, or
* use the matching API: `https://api.gbif.org/v2/species/match?scientificName=Fungi&checklistKey=7ddf754f-d193-4cc9-b351-99906754a03b` and use `usage.key` from the response.

Then update the scope:

```js
// before: GBIF Backbone (the default)
occurrenceSearch: {
  scope: { type: 'equals', key: 'taxonKey', value: 5 }
}

// after: Catalogue of Life
defaultChecklistKey: '7ddf754f-d193-4cc9-b351-99906754a03b',
occurrenceSearch: {
  scope: { type: 'equals', key: 'taxonKey', value: 'F' }
}
```

The same applies to other taxon based keys in a scope (`acceptedTaxonKey`, `kingdomKey`, `familyKey` and so on) and to `taxonomicIssue` and `iucnRedListCategory`, which are also read from the active taxonomy.

## Search options

Each search has its own section in the configuration: `occurrenceSearch`, `datasetSearch`, `publisherSearch`, `collectionSearch`, `institutionSearch` and `literatureSearch`. They take these options:

| option | what it does |
|--------|--------------|
| `scope` | the data scope, see [Data scope](#data-scope) |
| `highlightedFilters` | filters shown by default |
| `excludedFilters` | filters that are removed |
| `availableTableColumns` | the columns users can choose from, in the order they are shown (occurrence and literature search only) |
| `defaultEnabledTableColumns` | the columns shown by default (occurrence and literature search only) |
| `tabs` | the views to offer (occurrence search only) |
| `defaultTab` | the view to open first (occurrence search only) |

Lists replace the defaults rather than add to them. If you set `excludedFilters`, list everything you want excluded.

The search tabs on detail pages can be configured separately, which is useful when e.g. the occurrences of a single dataset need fewer filters than your main search:

```js
var siteConfig = {
  version: 3,
  datasetKey: {
    occurrenceSearch: { excludedFilters: ['datasetKey'], tabs: ['table', 'map'] },
    literatureSearch: { highlightedFilters: ['q', 'year'] }
  },
  collectionKey: { occurrenceSearch: { tabs: ['table', 'gallery'] } },
  institutionKey: { occurrenceSearch: { excludedFilters: ['institutionKey'] } },
  publisherKey: { literatureSearch: { highlightedFilters: ['q', 'year'] } }
};
```

### Occurrence search tabs

Possible values are `table`, `map`, `gallery`, `clusters`, `datasets`, `dashboard` and `download`, in lower case. Leave out the ones that make no sense for your data, e.g. `gallery` if there are no images in your scope.

```js
var siteConfig = {
  version: 3,
  occurrenceSearch: {
    tabs: ['table', 'map', 'download'],
    defaultTab: 'map'
  }
};
```

Include `download` if users should be able to download data. Older configurations got it automatically.
{: .notification .is-info}

### Occurrence filters

The filter names for occurrence search are:

`q, country, publishingCountry, institutionKey, collectionKey, datasetKey, taxonKey, publishingOrg, hostingOrganizationKey, networkKey, gadmGid, institutionCode, collectionCode, recordNumber, establishmentMeans, sex, lifeStage, license, basisOfRecord, mediaType, month, continent, protocol, dwcaExtension, iucnRedListCategory, typeStatus, issue, taxonomicIssue, occurrenceStatus, projectId, recordedById, identifiedById, occurrenceId, organismId, higherGeography, eventId, parentEventId, fieldNumber, isInCluster, isSequenced, year, coordinateUncertaintyInMeters, depth, organismQuantity, relativeOrganismQuantity, sampleSizeValue, elevation, catalogNumber, preparations, biostratigraphy, lithostratigraphy, geologicalTime, sampleSizeUnit, locality, waterBody, stateProvince, datasetId, samplingProtocol, verbatimScientificName, recordedBy, identifiedBy, geometry, eventDate, taxonId, islandGroup, island, programme, datasetName, gbifRegion, gbifId, endDayOfYear, startDayOfYear, organismQuantityType, pathway, datasetCategory, previousIdentifications, associatedSequences, degreeOfEstablishment, lastInterpreted, publishedByGbifRegion, georeferencedBy, repatriated, distanceFromCentroidInMeters, predicate, nucleotideSequenceTargetGene, nucleotideSequenceSequenceLength, nucleotideSequenceId, nucleotideSequenceNucleotideSequenceID`

The current list is in [the code](https://github.com/gbif/gbif-web/blob/master/packages/gbif-org/src/routes/occurrence/search/filters.tsx).

```js
var siteConfig = {
  version: 3,
  occurrenceSearch: {
    highlightedFilters: ['taxonKey', 'collectionCode', 'year'],
    excludedFilters: ['datasetKey'] // useful if your site is scoped to a single dataset
  }
};
```

### Occurrence table columns

```js
var siteConfig = {
  version: 3,
  occurrenceSearch: {
    // all the columns users can choose from, in the order they appear. By default all columns are available.
    availableTableColumns: ['features', 'country', 'coordinates', 'year', 'basisOfRecord', 'datasetKey', 'publishingOrg', 'catalogNumber', 'recordedBy', 'identifiedBy'],
    // the columns shown by default. The order is set by the list above. Users can change this in the table.
    defaultEnabledTableColumns: ['features', 'basisOfRecord', 'catalogNumber']
  }
};
```

The scientific name is always shown as the first column. The other columns are:

`commonName, features, media, country, coordinates, elevation, depth, year, eventDate, basisOfRecord, datasetKey, publishingOrg, catalogNumber, recordedBy, identifiedBy, recordNumber, typeStatus, preparations, collectionCode, organismId, specimenTriplet, institutionCode, institutionKey, collectionKey, locality, fieldNumber, occurrenceRemarks, individualCount, organismQuantity, higherGeography, stateProvince, establishmentMeans, sex, lifeStage, iucnRedListCategory`

See [the code](https://github.com/gbif/gbif-web/blob/master/packages/gbif-org/src/routes/occurrence/search/views/table/columns.tsx) (the `id` of each column) for the current list.

### Occurrence map

`mapSettings` sets where the occurrence map starts:

```js
occurrenceSearch: {
  mapSettings: { lat: 56, lng: 10, zoom: 5 }
}
```

## Other options

| option | what it does |
|--------|--------------|
| `availableCatalogues` | the catalogues in the catalogue menu: `OCCURRENCE`, `DATASET`, `PUBLISHER`, `COLLECTION`, `INSTITUTION`, `LITERATURE`. If you leave it out, all catalogues are shown, so always set it |
| `disableInlineTableFilterButtons` | `true` removes the buttons for adding a filter by clicking a table cell. See [hosted-portals#274](https://github.com/gbif/hosted-portals/issues/274) |
| `openDrawerOnTableRowClick` | `true` (default) opens a record in a side panel when clicking a table row; `false` goes to the record's page |
| `messages` | translations to overwrite, per language code: `{ en: { 'catalogues.occurrences': 'Specimens' }, da: { ... } }` |
| `dataHeader` | `{ enableApiPopup: false, enableInfoPopup: false }` hides the API and info buttons in the header of the data pages. They are on by default, but not translated yet |
| `apiKeys` | `{ maptiler: '...' }`, needed for some map styles |
| `maps` | map projections and styles, see below |

## Map options

```js
var siteConfig = {
  version: 3,
  apiKeys: {
    // see https://github.com/gbif/hosted-portals/issues/229
    maptiler: 'you_need_to_register_to_get_your_key'
  },
  maps: {
    locale: 'en', // passed to addMapStyles as `language`. The GBIF base maps follow the language of the page
    mapStyles: {
      defaultProjection: 'MERCATOR', // the projection shown first
      defaultMapStyle: 'NATURAL', // the style shown first
      // which styles are available in which projection
      options: {
        ARCTIC: ['NATURAL', 'BRIGHT'],
        PLATE_CAREE: ['NATURAL', 'BRIGHT', 'DARK'],
        MERCATOR: ['NATURAL', 'BRIGHT', 'SATELLITE', 'DARK'],
        ANTARCTIC: ['NATURAL', 'BRIGHT', 'DARK']
      }
    },
    // optionally add your own map styles or overwrite existing ones
    addMapStyles: function ({ mapStyleServer, language, pixelRatio, apiKeys, mapComponents }) {
      return {
        BRIGHT_MERCATOR_TEST: { // the name of your style
          component: mapComponents.OpenlayersMap, // OpenlayersMap or MapLibreMap
          labelKey: 'My custom bright map', // the label in the select. Use a translation key
          mapConfig: {
            basemapStyle: 'https://route.to.your.style.json',
            projection: 'EPSG_3857' // one of EPSG_4326, EPSG_3031, EPSG_3857, EPSG_3575
          }
        }
      };
    },
    // show a different style for a given projection and style name
    styleLookup: {
      MERCATOR: {
        BRIGHT: 'BRIGHT_MERCATOR_TEST' // when showing BRIGHT in Mercator, use the style 'BRIGHT_MERCATOR_TEST'
      }
    }
  }
};
```

`NATURAL_HILLSHADE_MERCATOR` and `SATELLITE_MERCATOR` need a maptiler API key.

The style `SATELLITE` uses `SATELLITE_MERCATOR` by default. To add hillshading to the default `NATURAL` style, point it to `NATURAL_HILLSHADE_MERCATOR` in `styleLookup`.

This is all a bit tricky, so feel free to [ask](https://github.com/gbif/hosted-portals/issues/new).

## Moving from version 2

The library still reads version 2 configurations, converts them and logs the converted version in the browser console. These are the changes:

| version 2 | version 3 |
|-----------|-----------|
| `version: 2` | `version: 3` |
| `routes.enabledRoutes: ['occurrenceSearch', ...]` | `pages: [{ id: 'occurrenceSearch' }, ...]` |
| `routes.occurrenceSearch.route: '/specimen/search'` | `pages: [{ id: 'occurrenceSearch', path: 'specimen/search' }]` |
| `occurrence: { ... }` | `occurrenceSearch: { ... }` |
| `dataset`, `publisher`, `collection`, `institution`, `literature` | `datasetSearch`, `publisherSearch`, `collectionSearch`, `institutionSearch`, `literatureSearch` |
| `occurrence.rootPredicate` | `occurrenceSearch.scope` |
| `collection.rootFilter` (and the same for other searches) | `collectionSearch.scope` |
| `literature.rootFilter.predicate` | `literatureSearch.scope` |
| `occurrence.occurrenceSearchTabs: ['MAP', 'TABLE']` | `occurrenceSearch.tabs: ['map', 'table', 'download']` (lower case, and `download` is no longer added for you) |
| `defaultTableColumns` | `defaultEnabledTableColumns` |
| `maps.defaultProjection`, `maps.defaultMapStyle`, `maps.mapStyles` | `maps.mapStyles.defaultProjection`, `maps.mapStyles.defaultMapStyle`, `maps.mapStyles.options` |
| `messages: { 'key': 'text' }` (used for every language) | `messages: { en: { 'key': 'text' }, da: { 'key': 'tekst' } }` (one entry per language) |
| API and info popups in the data header were always off | they are on unless you set `dataHeader: { enableApiPopup: false, enableInfoPopup: false }` |
| `apiKeys.mapbox` | no longer used |
| `institution.mapSettings` | no longer used |

Some filter names have changed:

* occurrence search: `occurrenceIssue` is now `issue`, `publishingCountryCode` is `publishingCountry`, `publisherKey` is `publishingOrg` and `coordinateUncertainty` is `coordinateUncertaintyInMeters`. `hasCoordinate` and `hasGeospatialIssue` no longer exist.
* dataset search: `anyPublisherKey` is `publishingOrg`, `datasetType` is `type`, `publishingCountryCode` is `publishingCountry` and `hostingOrganizationKey` is `hostingOrg`.
* publisher search: `countrySingle` is `country`.
* collection search: `institutionKeySingle` is `institutionKey`, `countryGrSciColl` is `country`, `specimensInGbif` is `occurrenceCount`, `collectionContentType` is `contentType`, `taxonKeyGrSciColl` is `taxonKey`, `collectionDescriptorCountry` is `descriptorCountry` and `recordedByFreeText` is `recordedBy`.
* institution search: `countryGrSciColl` and `countrySingleGrSciColl` are `country`, `institutionType` is `type` and `specimensInGbif` is `occurrenceCount`.

In version 2, having a section such as `dataset: {}` also enabled the page and its catalogue. In version 3 only `pages` decides which pages exist and only `availableCatalogues` which catalogues are shown; leaving either out enables everything. The default map style is now `NATURAL` (it was `BRIGHT`).

## Usage outside of a hosted portal

The data pages are a JavaScript library, so they can be embedded on other sites too. Do so with caution: we are still developing it and the configuration can change. On hosted portals we update configurations and dependencies as needed; elsewhere we cannot. Please get in touch before using it in production, so we can tell you about changes.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://www-lib.gbif.org/style.css" />
  </head>
  <body>
    <div id="root" class="gbif"></div>
    <script type="module">
      import { render } from 'https://www-lib.gbif.org/gbif-lib.js';

      render(document.getElementById('root'), {
        version: 3,
        languages: [
          { code: 'en', localeCode: 'en', label: 'English', default: true, textDirection: 'ltr' }
        ],
        theme: {
          primary: '#4787fb',
          borderRadius: 3
        },
        pages: [
          { id: 'occurrenceSearch', path: '' },
          { id: 'occurrenceKey' },
          { id: 'datasetKey' }
        ],
        availableCatalogues: ['OCCURRENCE'],
        occurrenceSearch: {
          tabs: ['table', 'map', 'gallery', 'download']
        }
      });
    </script>
  </body>
</html>
```

The page has to be served so that every path the library uses (e.g. `/occurrence/<key>`) returns this same HTML file.
