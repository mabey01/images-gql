const getImagesDB = require('../../images/helpers/get-images-db.js');
const convertUnderscoreId = require('../../utils/convert-underscore-id.js');

module.exports = async album => {
    let images = [];
    let cover = null;

    if (album.images) {
        images = await getImagesDB().find({ _id: { $in: album.images }});
    }

    if (album.cover) {
        cover = await getImagesDB().findOne({_id: album.cover});
    }

    return {
        images: images.map(convertUnderscoreId),
        cover: convertUnderscoreId(cover)
    }
};