const { getDB } = require('../../../database/init.js');

module.exports.schema = `
    removeImages(ids: [ID!]!): [Image]
`;

module.exports.resolver = async (parent, {ids}) => {
    const images = await getDB('images').find({ _id: { $in: ids }});
    const deleted = await getDB('images').remove({ _id: { $in: ids }}, { multi: true });

    console.log(deleted);

    return images.map(({_id, ...image}) => {
        return {
            id: _id,
            ...image
        };
    })
};