const getAlbumDB = require('../helpers/get-db.js');
const getAlbumImages = require('../helpers/get-album-images.js');
const convertUnderscoreId = require('../../utils/convert-underscore-id.js');

module.exports.schema = `
    addImagesToAlbum(albumID: ID!, imageIDs: [ID!]!): Album
`;

module.exports.resolver = async (parent, {albumID, imageIDs}) => {
    const updateObject = {
        "images": { $each: imageIDs }
    };

    const album = await getAlbumDB().update({_id: albumID}, { $push: updateObject }, { upsert: true, returnUpdatedDocs: true });
    const albumImages = await getAlbumImages(album);

    return convertUnderscoreId({...album, images: albumImages});
};