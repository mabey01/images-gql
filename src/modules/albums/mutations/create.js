const getAlbumDB = require('../helpers/get-db.js');
const convertUnderscoreId = require('../../utils/convert-underscore-id.js');

module.exports.schema = `
    createAlbum(name: String!): Album
`;

module.exports.resolver = async (parent, {name}) => {
    const newAlbum = {
        name,
        createdTimestamp: Date.now()
    };

    const savedAlbum = await getAlbumDB().insert(newAlbum);

    return convertUnderscoreId(savedAlbum);
};