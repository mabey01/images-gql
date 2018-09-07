const { getDB } = require('../../../database/init.js');

module.exports = async (parent, {id, rating}) => {
    const image = await getDB('images').update({_id: id}, { $set: { rating } }, { upsert: true, returnUpdatedDocs: true });

    console.log(image);
    return {
        id,
        ...image
    };
};