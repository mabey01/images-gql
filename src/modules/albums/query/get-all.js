const getAlbumDB = require('../helpers/get-db.js');
const getAlbumImages = require('../helpers/get-album-images.js');
const convertUnderscoreId = require('../../utils/convert-underscore-id.js');

const PAGE_SIZE = 100;

module.exports.schema = `
    albums(sortByDate: String, page: Int): [Album]
`;


module.exports.resolver = async (parent, {sortByDate, page = 0}) => {
    const docs = await getAlbumDB()
        .find({})
        .sort({
            "createdTimestamp": sortByDate === 'ASC' ? 1 : -1
        })
        .skip(page * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .exec();


    return docs.map(convertUnderscoreId).map(async album => {
        const {images, cover} = await getAlbumImages(album);
        return {
            ...album,
            images,
            cover
        }
    });
};