const toTimeStamp = require('./helper/to-timestamp.js');

module.exports = {
    camera: obj => obj['Make'],
    model: obj => obj['Model'],
    lensInfo: obj => obj['LensInfo'],

    originalFileName: obj => obj['FileName'],
    megapixels: obj => obj['Megapixels'],
    dimensions: obj => ({
        width: obj['ImageWidth'],
        height: obj['ImageHeight'],
    }),
    orientation: obj => obj['Orientation'],
    dateTimeOriginal: obj => toTimeStamp(obj['DateTimeOriginal']),

    iso: obj => obj['ISO'],
    shutterSpeed: obj => obj['ShutterSpeed'],
    aperture: obj => obj['Aperture'],
    focalLength: obj => parseInt(obj['FocalLength']),
    focalLengthIn35: obj => parseInt(obj['FocalLengthIn35mmFormat']),
    fov: obj => parseInt(obj['FOV']),

    meteringMode: obj => obj['MeteringMode'],
    program: obj => obj['ExposureProgram']
};