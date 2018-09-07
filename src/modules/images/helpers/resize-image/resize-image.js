const sharp = require('sharp');

module.exports = async ({inputFile, outputFile, width = 400, height = null, quality = 80, format = 'jpeg'} = {}) => {
    const createdImage = await sharp(inputFile)
        .resize(width, height)
        .rotate()
        .toFormat(format, {quality})
        .toFile(outputFile);

    return {
        ...createdImage,
        filePath: outputFile
    };
};