
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
    enabledRoutes: ['occurrenceSearch', 'institutionKey', 'institutionSearch', 'publisherSearch', 'collectionKey', 'collectionSearch', 'datasetKey', 'datasetSearch', 'literatureSearch'],
    occurrenceSearch: {
      isHref: true,
      url: ({queryString}) => '/occurrence/search?' + queryString,
      route: '/occurrence/search'
    },
    collectionKey: {
      route: '/collection/:key',
      isHref: true,
      url: ({ key }) => {
        return `/collection/${key}`;
      }
    },
    collectionSpecimens: {
      route: '/collection/:key/specimens',
      url: ({ key }) => `/collection/${key}/specimens`
    },
    institutionKey: {
      route: '/institution/:key',
      isHref: true,
      url: ({ key }) => {
        return `/institution/${key}`;
      }
    },
    institutionSpecimens: {
      route: '/institution/:key/specimens',
      url: ({ key }) => `/institution/${key}/specimens`
    },
    datasetKey: {
      isHref: true,
      url: ({ key }) => `/dataset/${key}`,
      route: '/dataset/:key'
    },
    datasetCitations: {
      route: '/dataset/:key/citations',
      url: ({ key }) => `/dataset/${key}/citations`
    },
    datasetDownload: {
      route: '/dataset/:key/download',
      url: ({ key }) => `/dataset/${key}/download`
    },
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
    availableCatalogues: ['OCCURRENCE', 'DATASET', 'PUBLISHER', 'COLLECTION', 'INSTITUTION', 'LITERATURE'],
    mapSettings: {
      enabled: true,
      lat: 0,
      lng: 0,
      zoom: 1
    },
  },
  collection: {
    availableCatalogues: ['OCCURRENCE', 'DATASET', 'PUBLISHER', 'COLLECTION', 'INSTITUTION', 'LITERATURE']
  },
  publisher: {
    availableCatalogues: ['OCCURRENCE', 'DATASET', 'PUBLISHER', 'COLLECTION', 'INSTITUTION', 'LITERATURE']
  },
  apiKeys: {
    "maptiler": "wFxbBf3Tv2e75QQfYOOW",
    "mapbox": "pk.eyJ1IjoiZ2JpZiIsImEiOiJja3VmZm50Z3kxcm1vMnBtdnBmeGd5cm9hIn0.M2z2n9QP9fRHZUCw9vbgOA"
  },
  availableCatalogues: ['OCCURRENCE', 'DATASET', 'PUBLISHER', 'LITERATURE', 'COLLECTION', 'INSTITUTION'],
  maps: {
    locale: 'en',
    defaultProjection: 'MERCATOR',
    defaultMapStyle: 'NATURAL',
    mapStyles: {
      ARCTIC: ['NATURAL', 'BRIGHT'],
      PLATE_CAREE: ['NATURAL', 'BRIGHT', 'DARK'],
      MERCATOR: ['NATURAL', 'BRIGHT', 'SATELLITE', 'DARK'],
      ANTARCTIC: ['NATURAL', 'BRIGHT', 'DARK']
    },
    styleLookup: {
      MERCATOR: {
        NATURAL: 'NATURAL_HILLSHADE_MERCATOR'
      }
    }
  }
};
