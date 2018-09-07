const fs = require('fs');
const path = require('path');

const promisePipe = require("promisepipe");

const { getDB } = require('../../../database/init.js');

const getExifData = require('../../helpers/exif/get-exif-data.js');
const generateThumbnailsFrom = require('../../helpers/convert-image/generate-thumbnails-from.js');
const generateSmallImagesFrom = require('../../helpers/convert-image/generate-small-images-from.js');

module.exports = async ({stream, filename}) => {
    console.log(filename);
    let image = {};

    const filenameWithoutExt = filename.split('.')[0];
    const filePath = path.join('./images', filenameWithoutExt + '_' + new Date().getTime(), filename);
    const dirPath = path.parse(filePath).dir;

    fs.mkdirSync(dirPath);
    const sourceStream = fs.createWriteStream(filePath);

    image.dir = dirPath;
    image.sourceFileName = filename;
    image.rating = null;
    try {
        await promisePipe(stream, sourceStream);
        image.exif = await getExifData(filePath);
        image.originalDateTime = image.exif.dateTimeOriginal;
        image.thumbnails = await generateThumbnailsFrom(filePath, dirPath);
        image.images = await generateSmallImagesFrom(filePath, dirPath);
    } catch(e) {
        console.log(e);
    }

    const newDoc = await getDB('images').insert(image);
    const {_id: id, ...imageObj} = newDoc;

    return [
        {
            id,
            ...imageObj
        }
    ];
};