const generateImages = require('./generate-images.js');

const images = [
    {
        width: 400,
        quality: 70
    },
    {
        width: 600,
        quality: 75
    },
    {
        width: 1000,
        quality: 80
    },
    {
        width: 1600,
        quality: 85
    },
    {
        width: 2400,
        quality: 90
    },
];

function generateFileName (width, height, quality) {
    return `image_${width}_${quality}.jpg`;
}

module.exports = (...args) => {
    return generateImages(...args, images, generateFileName);
};