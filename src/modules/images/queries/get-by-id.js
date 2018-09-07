const { getDB } = require('../../database/init.js');

module.exports = async (parent, args) => {
    const {_id: id, ...image} = await getDB('images').findOne({_id: args.id});

    return {
        id,
        ...image
    }
};