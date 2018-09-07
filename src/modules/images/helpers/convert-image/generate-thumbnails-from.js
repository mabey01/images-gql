const generateImages = require('./generate-images.js');

const thumbnails = [
    {
        width: 200,
        height: 200,
        quality: 60
    },
    {
        width: 400,
        height: 400,
        quality: 65
    },
    {
        width: 600,
        height: 600,
        quality: 70
    },
    {
        width: 1000,
        height: 1000,
        quality: 75
    },
];

module.exports = (...args) => {
    return generateImages(...args, thumbnails, (width, height, quality) => {
        return `thumbnail_${width}_${quality}.jpg`;
    });
};