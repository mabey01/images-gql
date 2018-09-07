const generateThumbnails = require('./generate-thumbnails-from.js');
const generateSmallImages = require('./generate-small-images-from.js');

module.exports = async function convertImage (filePath, dirPath) {
    const thumbnails = await generateThumbnails(filePath, dirPath);
    const images = await generateSmallImages(filePath, dirPath);

    return [...thumbnails, ...images]
};