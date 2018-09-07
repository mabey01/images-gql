const { getDB } = require('../../../database/init.js');

module.exports.schema = `
    removeImage(id: ID!): Image
`;

module.exports.resolver = async (parent, {id}) => {
    const {_id, ...imageObject} = await getDB('images').findOne({_id: id});
    await getDB('images').remove({ _id: id }, {});

    console.log(imageObject);
    return {
        id: _id,
        ...imageObject
    };
};