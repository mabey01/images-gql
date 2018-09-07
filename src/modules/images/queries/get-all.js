const { getDB } = require('../../database/init.js');

const PAGE_SIZE = 100;

module.exports.schema = `
    images(sortByDate: String, page: Int): [Image]
`;


module.exports.resolver = async (parent, {sortByDate, page = 0}) => {
    const docs = await getDB('images')
        .find({})
        .sort({
            "originalDateTime": sortByDate === 'ASC' ? 1 : -1
        })
        .skip(page * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .exec();

    return docs.map(doc => {
        const {_id: id, ...image} = doc;

        return {
            id,
            ...image
        }
    });
};