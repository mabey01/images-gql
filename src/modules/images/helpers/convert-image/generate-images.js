const fs = require('fs');
const path = require('path');
const chainPromiseMap = require('../../../utils/chain-promise-map.js');

const resizeImage = require('../resize-image/resize-image.js');

module.exports = async (imageFilePath, dirPath, outputImages, generateOutputFilename) => {
    return await chainPromiseMap(outputImages, async outputImage => {
        const {width, height, quality} = outputImage;
        const outputFilePath = path.join(dirPath, generateOutputFilename(width, height, quality));

        return resizeImage({
            inputFile: imageFilePath,
            outputFile: outputFilePath,
            width,
            height,
            quality,
        })
    });
};