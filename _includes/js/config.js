
var primaryColor = themeStyle && themeStyle.colors && themeStyle.colors.primary;
var isSquared = themeStyle && themeStyle.square;

if (primaryColor) {
  var siteTheme = gbifReactComponents.themeBuilder.extend({baseTheme: 'light', extendWith: {
    primary: primaryColor,
    borderRadius: isSquared? 0 : 3
  }});
}

var siteConfig = {
  version: 2,
  routes: {
    enabledRoutes: ['occurrenceSearch', 'institutionKey', 'institutionSearch', 'publisherSearch', 'collectionKey', 'collectionSearch', 'datasetKey', 'datasetSearch', 'literatureSearch'],
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

var siteConfig_uk = {
  routes: {
    occurrenceSearch: {
      // The route you are currently using for occurrence search. The language prefix will be added automatically
      // If you need special routes per language, then you have to add locale specific overwrites. The page language is available as a global variable called `pageLang`
      route: '/specimen/search'
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
  },
  occurrence: {
    excludedFilters: ['occurrenceStatus', 'networkKey', 'hostingOrganizationKey', 'protocol', 'publishingCountryCode', 'institutionCode', 'collectionCode'],
    highlightedFilters: ['taxonKey', 'verbatimScientificName', 'institutionKey', 'collectionKey', 'catalogNumber', 'recordedBy', 'identifiedBy'],
    defaultTableColumns: ['features', 'institutionKey', 'collectionKey', 'catalogNumber', 'country', 'year', 'recordedBy', 'identifiedBy'],
    availableCatalogues: ['INSTITUTION', 'COLLECTION', 'OCCURRENCE'],
    mapSettings: {
      lat: 0,
      lng: 0,
      zoom: 0
    },
    // You probably need help to configure the scope - so just ask
    // for his demo site we only show Fungi (taxonKey=5). It use the predicate structure known from GBIF download API. 
    // See https://www.gbif.org/developer/occurrence (long page without enough anchors - search for "Occurrence Download Predicates")
    // The format is however slightly different, in that is use camelCase for keys instead of CONSTANT_CASE. 
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
        },
        { "type": "equals", "key": "publishingCountry", "value": "GB" }
      ]
    },
    occurrenceSearchTabs: ['TABLE', 'GALLERY', 'MAP', 'DATASETS'] // what tabs should be shown
    // see https://hp-theme.gbif-staging.org/data-exploration-config for more options
  },
  collection: {
    availableCatalogues: ['INSTITUTION', 'COLLECTION', 'OCCURRENCE'],
    excludedFilters: ['countrySingleGrSciColl'],
    rootFilter: {
      displayOnNHCPortal: true,
      country: "GB",
	  active: true
    }
  },
  institution: {
    availableCatalogues: ['INSTITUTION', 'COLLECTION', 'OCCURRENCE'],
    excludedFilters: ['countrySingleGrSciColl'],
    rootFilter: {
      displayOnNHCPortal: true,
      country: "GB",
      active: true
    },
    mapSettings: {
      enabled: true,
      lat: 54.89,
      lng: -3.86,
      zoom: 5.4
    },
  },
  apiKeys: {
    maptiler: "2RcTol2NPTFHDIGb3CDP",
    mapbox: "pk.eyJ1IjoiZGlzc2NvdWsiLCJhIjoiY2xpd3h5dWk1MDJuaDNxcWV0cGExM2JyMCJ9.EHSAxoecThELIUWq84M4wg"
  },
  maps: {
    // locale: 'ja',
    defaultProjection: 'MERCATOR',
    defaultMapStyle: 'BRIGHT',
    mapStyles: {
      ARCTIC: ['NATURAL', 'BRIGHT'],
      PLATE_CAREE: ['NATURAL', 'BRIGHT', 'DARK'],
      MERCATOR: ['NATURAL', 'BRIGHT', 'SATELLITE', 'DARK'],
      ANTARCTIC: ['NATURAL', 'BRIGHT', 'DARK']
    }
  },
  messages: {
    "catalogues.occurrences": "Specimens",
    "filters.city.name": "City/town"
  }
};