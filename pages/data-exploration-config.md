---
layout: documentation
permalink: /data-exploration-config # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: data scope
description: How to configure your data scope
sideNavigation: sideNavigation.guides
toc: true
---
# Configuration of data widgets

## Data scope

You can configure your data scope in `/_includes/js/config.js`.

Below is an example of a site configured to only show fungi (i.e. taxonKey=5 in the GBIF backbone). Any predicate can be used. The format is defined in the [GBIF developer documentation](https://www.gbif.org/developer/occurrence#predicates). There is a difference though: keys are `camelCase` (as in APIv1 query parameters) instead of `CONSTANT_CASE`.

```js
var siteConfig = {
  version: 2,
  disableInlineTableFilterButtons: false, // disable option for adding filters by clicking table cells. See https://github.com/gbif/hosted-portals/issues/274
  routes: {
    enabledRoutes: ['occurrenceSearch', 'collectionSearch', 'collectionKey', 'institutionSearch', 'institutionKey'], // what widgets do you include on your site. If not included we will link to gbif.org (for showing individual datasets for example)
    occurrenceSearch: { // you can overwrite individual routes. 
      route: '/specimen/search' // in this case we want the occurrence search to be available on a url that says specimens instead
    }
  },
  availableCatalogues: ['INSTITUTION', 'COLLECTION', 'OCCURRENCE'],
  occurrence: {
    excludedFilters: ['occurrenceStatus', 'networkKey', 'hostingOrganizationKey', 'protocol', 'publishingCountryCode', 'institutionCode', 'collectionCode'],
    highlightedFilters: ['taxonKey', 'verbatimScientificName', 'institutionKey', 'collectionKey', 'catalogNumber', 'recordedBy', 'identifiedBy'],
    defaultTableColumns: ['features', 'institutionKey', 'collectionKey', 'catalogNumber', 'country', 'year', 'recordedBy', 'identifiedBy'],
    mapSettings: {
      lat: 0,
      lng: 0,
      zoom: 0
    },
    rootPredicate: {
      "type": "and",
      "predicates": [
        {
          "type": "or",
          "predicates": [
            {
              "type": "isNotNull",
              "key": "institutionKey"
            },
            {
              "type": "isNotNull",
              "key": "collectionKey"
            }
          ]
        },
        {
          "type": "in",
          "key": "basisOfRecord",
          "values": [
            "PRESERVED_SPECIMEN",
            "FOSSIL_SPECIMEN",
            "MATERIAL_SAMPLE",
            "LIVING_SPECIMEN"
          ]
        }
      ]
    },
    occurrenceSearchTabs: ['MAP', 'TABLE', 'GALLERY', 'DATASETS'] // what tabs should be shown
  },
  collection: {
    rootFilter: { // filters on the grscicoll collection v1 API https://www.gbif.org/developer/summary
      displayOnNHCPortal: true 
    }
  },
  institution: {
    rootFilter: { // filters on the grscicoll institution v1 API https://www.gbif.org/developer/summary
      displayOnNHCPortal: true,
      active: true
    },
    mapSettings: {
      enabled: true, // show a map on institution search?
      lat: 0, // what is the default position of the map
      lng: 0,
      zoom: 1
    },
  },
  literature: {
    rootFilter: {
      predicate: {
        type: 'or', predicates: [
          {
            type: 'in',
            key: 'countriesOfResearcher',
            values: ['US', 'UM', 'AS', 'FM', 'GU', 'MH', 'MP', 'PR', 'PW', 'VI']
          },
          {
            type: 'in',
            key: 'countriesOfCoverage',
            values: ['US', 'UM', 'AS', 'FM', 'GU', 'MH', 'MP', 'PR', 'PW', 'VI']
          }
        ]
      }
    },
    highlightedFilters: ['q', 'countriesOfResearcher', 'countriesOfCoverage', 'year']
  },
  dataset: {
    rootFilter: {type: ['CHECKLIST']}
  },
  apiKeys: {
    maptiler: "GET_YOUR_OWN_TOKEN", // https://github.com/gbif/hosted-portals/issues/229
    mapbox: "GET_YOUR_OWN__TOKEN"
  },
  maps: {
    locale: 'ja', // we want to show the maps in japanese
    defaultProjection: 'MERCATOR',
    defaultMapStyle: 'BRIGHT',
    mapStyles: {
      ARCTIC: ['NATURAL', 'BRIGHT'],
      PLATE_CAREE: ['NATURAL', 'BRIGHT', 'DARK'],
      MERCATOR: ['NATURAL', 'BRIGHT', 'SATELLITE', 'DARK'],
      ANTARCTIC: ['NATURAL', 'BRIGHT', 'DARK']
    }
  },
  messages: { // custom overwrites for the translations, e.g. label the occurrence catalog as a specimen catalog to match our data scope of specimens.
    "catalogues.occurrences": "Specimens"
  }
};
```

Your data scope is unlikely to change very often, so we can help configuring it if you need help.
{: .notification .is-info}

## Adding more than occurrences
For each type you enable you need a corresponding markdown file. E.g. you want to add `collectionSearch`, then you also need to create a `collection.md` with the content
```yml
---
permalink: /collection/search # This is the important as the url should be the same as the widget is configured to react to
layout: collection-search # important as the layout is what inserts the widget

# the rest is just the usual Frontmatter
title: Collection
description: Explore our collections
lang-ref: collection
---
```

The available layouts are: `collection-search, collection-key, institution-search, institution-key, dataset-search, dataset-key, occurrence, publisher, literature`.

And the default routes are `collection/search, collection/:key, institution/search, institution:key, dataset/search, dataset/:key, occurrence/search, publisher/search, literature/search`

## Occurrence search tabs
You can configure which tabs to show for occurrence search. This can be useful if e.g. you know that there is no images in your data scope.

Configuration found in `/_includes/js/config.js`

```
var siteConfig = {
  // along with whatever other properties you have. E.g. your 'rootPredicate'
  occurrence: {
    occurrenceSearchTabs: ['MAP', 'TABLE'], // possible values are TABLE, MAP, GALLERY, DATASETS
  }
};
```

## Occurrence filters
Which filters should be available and which should be visible per default.

### Excluded filters
You can disable individual filters by providing a list. To do so you need to know what they are called. To know the options you need to consult [the list of possible filters](https://github.com/gbif/gbif-web/blob/master/packages/react-components/src/search/OccurrenceSearch/config/filterConf.js).

Configuration found in `/_includes/js/config.js`

```
var siteConfig = {
  // along with whatever other properties you have. E.g. your 'rootPredicate'
  occurrence: {
    excludedFilters: ['datasetKey'], // useful if your site is scoped by a single dataset
  }
};
```

### Highlighted
It is possible to choose which filters to show as a default.
```
var siteConfig = {
  // along with whatever other properties you have. E.g. your 'rootPredicate'
  occurrence: {
    highlightedFilters: ['collectionCode', 'taxonKey'],
  }
};
```

### Default columns in occurrence table
It is possible to control which columns are shown. 
```
var siteConfig = {
  // along with whatever other properties you have. E.g. your 'rootPredicate'
  occurrence: {
    availableTableColumns: ['features', 'country', 'coordinates', 'year', 'basisOfRecord', 'dataset', 'publisher', 'catalogNumber', 'recordedBy', 'identifiedBy'] // all the columns that are available to the user. This array defines the order they appear in. By default all all column are available.
    defaultTableColumns: ['features', 'basisOfRecord', 'preparations'] // the columns showed by default. The order is not relevant, as it is defined in the list of available columns. The user can change what columns to show in the UI.
  }
};
```
The currently available column names can be seen in the [code](https://github.com/gbif/gbif-web/blob/master/packages/react-components/src/search/OccurrenceSearch/config/tableConfig.js#L18) as the property `name`.

## Map options

You can configure the available projections and base layers in in `/_includes/js/config.js`.

```js
var siteConfig = {
  apiKeys: {
     // see https://github.com/gbif/hosted-portals/issues/229
    "maptiler": "you_need_to_register_to_get_your_key",
  },
  maps: {
    locale: 'en', // what language should be used for GBIF base maps? See https://tile.gbif.org/ui/ for available languages in basemaps
    defaultProjection: 'MERCATOR', // what is the default projection
    defaultMapStyle: 'NATURAL', // what is the default style
    // what options are avialable for which projections. Default styles are included, but you can also add your own if you are a carthography and style json expert. If not you probably need help.
    mapStyles: {
      ARCTIC: ['NATURAL', 'BRIGHT'],
      PLATE_CAREE: ['NATURAL', 'BRIGHT', 'DARK'],
      MERCATOR: ['NATURAL', 'BRIGHT', 'SATELLITE', 'DARK'],
      ANTARCTIC: ['NATURAL', 'BRIGHT', 'DARK']
    },
    // you can optionally add your own map styles or overwrite existing ones
    addMapStyles: function ({ mapStyleServer, language, pixelRatio, apiKeys, mapComponents }) {
      return {
        BRIGHT_MERCATOR_TEST: { // the name of your style
          component: mapComponents.OpenlayersMap, // what map component to use OpenlayersMap | OpenlayersMapbox
          labelKey: 'My custom bright map', // the label in the select. Use a translation key
          mapConfig: {
            basemapStyle: `https://route.to.your.style.json`,
            projection: 'EPSG_3857'// one of 4326 | 3031 | 3857 | 3575
          }
        }
      }
    },
    // rewire style names to show a different style
    styleLookup: {
      MERCATOR: {
        BRIGHT: 'BRIGHT_MERCATOR_TEST' // when showing the map type NATURAL in Mercator, then use the style 'BRIGHT_MERCATOR_TEST'.
      }
    }
  }
};
```

`NATURAL_HILLSHADE_MERCATOR` and `SATELLITE_MERCATOR` requires a maptiler API key.

The map type `SATELLITE` is mapped to the style `SATELLITE_MERCATOR` per default. If you want to add hillshading to the default `NATURAL` map type, then you need to wire it to `NATURAL_HILLSHADE_MERCATOR`in the lookup.

This is all a bit tricky, so feel free to [ask](https://github.com/gbif/hosted-portals/issues/new)
