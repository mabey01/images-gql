const DefaultNormalizedExifMap = require('../default-normalised-exif-map.js');
const DefaultNormalizedExifGPSMap = require('../default-normalised-exif-gps-map.js');

module.exports =  {
    ...DefaultNormalizedExifMap,
    ...DefaultNormalizedExifGPSMap
};