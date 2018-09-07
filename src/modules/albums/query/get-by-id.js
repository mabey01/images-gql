const getAlbumDB = require('../helpers/get-db.js');
const getAlbumImages = require('../helpers/get-album-images.js');
const convertUnderscoreId = require('../../utils/convert-underscore-id.js');

module.exports.schema = `
    album(id: ID): Album
`;


module.exports.resolver = async (parent, {id}) => {
    const doc = await getAlbumDB().findOne({_id: id});
    console.log(doc);
    const {images, cover} = getAlbumImages(doc);

    return convertUnderscoreId({
        ...doc,
        images,
        cover
    });
};