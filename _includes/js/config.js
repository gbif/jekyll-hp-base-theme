
var primaryColor = themeStyle && themeStyle.colors && themeStyle.colors.primary;
var isSquared = themeStyle && themeStyle.square;

if (primaryColor) {
  var siteTheme = gbifReactComponents.themeBuilder.extend({baseTheme: 'light', extendWith: {
    primary: primaryColor,
    borderRadius: isSquared? 0 : 3
  }});
}

var siteConfig = {
  routes: {
  },
  occurrence: {
    availableCatalogues: ['OCCURRENCE', 'DATASET', 'PUBLISHER', 'COLLECTION', 'INSTITUTION', 'LITERATURE']
  },
  dataset: {
    availableCatalogues: ['OCCURRENCE', 'DATASET', 'PUBLISHER', 'COLLECTION', 'INSTITUTION', 'LITERATURE']
  },
  literature: {
    availableCatalogues: ['OCCURRENCE', 'DATASET', 'PUBLISHER', 'COLLECTION', 'INSTITUTION', 'LITERATURE']
  },
  institution: {
    availableCatalogues: ['OCCURRENCE', 'DATASET', 'PUBLISHER', 'COLLECTION', 'INSTITUTION', 'LITERATURE']
  },
  collection: {
    availableCatalogues: ['OCCURRENCE', 'DATASET', 'PUBLISHER', 'COLLECTION', 'INSTITUTION', 'LITERATURE']
  },
  publisher: {
    availableCatalogues: ['OCCURRENCE', 'DATASET', 'PUBLISHER', 'COLLECTION', 'INSTITUTION', 'LITERATURE']
  }
};
