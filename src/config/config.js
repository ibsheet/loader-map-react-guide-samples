import IBSheetLoader from '@ibsheet/loader';

const ibmapLib = {
  name: 'ibmap',
  baseUrl: 'https://www.ibsheet.com/v8/assets/lib/ibmap/',
  dependentUrls: [
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  ],
}

// 로더 config
IBSheetLoader.config({
  registry: [ibmapLib]
});
