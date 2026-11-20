// Configuration of the data pages. See /data-exploration-config for the available options.
var siteConfig = {
  version: 3,
  pages: [
    { id: 'occurrenceSearch' },
    { id: 'institutionKey' },
    { id: 'institutionSearch' },
    { id: 'publisherSearch' },
    { id: 'publisherKey' },
    { id: 'collectionKey' },
    { id: 'collectionSearch' },
    { id: 'datasetKey' },
    { id: 'datasetSearch' },
    { id: 'literatureSearch' }
  ],
  occurrenceSearch: {
    tabs: ['table', 'map', 'gallery', 'clusters', 'dashboard', 'download']
  },
  dataHeader: {
    // not translated yet, so keep them off
    enableApiPopup: false,
    enableInfoPopup: false
  },
  apiKeys: {
    maptiler: 'wFxbBf3Tv2e75QQfYOOW'
  },
  availableCatalogues: ['OCCURRENCE', 'DATASET', 'PUBLISHER', 'COLLECTION', 'INSTITUTION', 'LITERATURE'],
  maps: {
    locale: 'en',
    mapStyles: {
      defaultProjection: 'MERCATOR',
      defaultMapStyle: 'NATURAL',
      options: {
        ARCTIC: ['NATURAL', 'BRIGHT'],
        PLATE_CAREE: ['NATURAL', 'BRIGHT', 'DARK'],
        MERCATOR: ['NATURAL', 'BRIGHT', 'SATELLITE', 'DARK'],
        ANTARCTIC: ['NATURAL', 'BRIGHT', 'DARK']
      }
    },
    styleLookup: {
      MERCATOR: {
        NATURAL: 'NATURAL_HILLSHADE_MERCATOR'
      }
    }
  }
};
