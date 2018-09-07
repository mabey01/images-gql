const DefaultNormalizedExifMap = require('../default-normalised-exif-map.js');

module.exports = {
    ...DefaultNormalizedExifMap,

    ambientTemperature: obj => obj['AmbientTemperature'],
    cameraTemperature: obj => obj['CameraTemperature']
};