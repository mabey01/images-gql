const chainPromiseMap = require('../../../utils/chain-promise-map.js');
const addImage = require('./add-image.js');


module.exports = async (parent, {images}) => {
    return chainPromiseMap(images, async (image) => {
        return addImage(await image);
    });
};