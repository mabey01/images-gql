const exiftool = require("exiftool-vendored").exiftool;

const getNormalizedExifData = require('./helper/get-normalised-exif.js');
const SonyRX100Map = require('./maps/sony-RX100.js');
const AppleIpadMap = require('./maps/apple-iPad.js');

module.exports = async filename => {
    if (!filename) return {};
    const exifObject = await exiftool.read(filename);

    const make = exifObject['Make'];
    const model = exifObject['Model'];

    if (make === 'SONY') {
        if (model === 'DSC-RX100') {
            return getNormalizedExifData(SonyRX100Map, exifObject);
        }
    }

    if (make === 'Apple') {
        if (model === 'iPad') {
            return getNormalizedExifData(AppleIpadMap, exifObject);
        }

        if (model === 'iPhone 5') {
            return getNormalizedExifData(AppleIpadMap, exifObject);
        }

        if (model === 'iPhone 6 Plus') {
            return getNormalizedExifData(AppleIpadMap, exifObject);
        }
    }

    return null;
};