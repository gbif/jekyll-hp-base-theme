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
```
var siteConfig = {
  rootPredicate: { type: 'equals', key: 'taxonKey', value: 5 }
};
```

Your data scope is unlikely to change very often, so we can help configuring it if you need help.
{: .notification .is-info}

## Occurrence search tabs
You can configure which tabs to show for occurrence search. This can be useful if e.g. you know that there is no images in your data scope.

Configuration found in `/_includes/js/config.js`

```
var siteConfig = {
  // along with whatever other properties you have. E.g. your 'rootPredicate'
  occurrenceSearchTabs: ['MAP', 'TABLE'], // possible values are TABLE, MAP, GALLERY, DATASETS
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
  excludedFilters: ['datasetKey'], // useful if your site is scoped by a single dataset
};
```

### Highligted
It is possible to choose which filters to show as a default.
```
var siteConfig = {
  // along with whatever other properties you have. E.g. your 'rootPredicate'
  highlightedFilters: ['collectionCode', 'taxonKey'],
};
```

### Default columns in occurrence table
It is possible to control which columns are shown. 
```
var siteConfig = {
  // along with whatever other properties you have. E.g. your 'rootPredicate'
  defaultTableColumns: ['features', 'country', 'coordinates', 'year', 'basisOfRecord', 'dataset', 'publisher', 'catalogNumber', 'recordedBy', 'identifiedBy'] // the first column will always be scientificName, that cannot be changed
};
```
The currently available column names can be seen in the [code](https://github.com/gbif/gbif-web/blob/master/packages/react-components/src/search/OccurrenceSearch/config/tableConfig.js#L18) as the property `name`.