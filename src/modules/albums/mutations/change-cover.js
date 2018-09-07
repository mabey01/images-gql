const getAlbumDB = require('../helpers/get-db.js');
const getAlbumImages = require('../helpers/get-album-images.js');
const convertUnderscoreId = require('../../utils/convert-underscore-id.js');

module.exports.schema = `
    changeAlbumCover(albumID: ID!, coverID: ID!): Album
`;

module.exports.resolver = async (parent, {albumID, coverID}) => {
    const updateObject = {
        "cover": coverID
    };

    const album = await getAlbumDB().update({_id: albumID}, { $set: updateObject }, { upsert: true, returnUpdatedDocs: true });
    const {images, cover} = await getAlbumImages(album);

    return convertUnderscoreId({...album, images, cover});
};