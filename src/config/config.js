import loader from '@ibsheet/loader';

// Leaflet 버전 상수
const LEAFLET_VERSION = '1.9.4';
const LEAFLET_BASE = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist`;

const ibmapLib = {
  name: 'ibmap',
  baseUrl: 'https://www.ibsheet.com/v8/assets/lib/ibmap/',
  dependentUrls: [
    `${LEAFLET_BASE}/leaflet.css`,
    `${LEAFLET_BASE}/leaflet.js`,
  ],
}

// 로더 config
loader.config({
  registry: [ibmapLib]
});
