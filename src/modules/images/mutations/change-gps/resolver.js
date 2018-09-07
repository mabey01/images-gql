const { getDB } = require('../../../database/init.js');

module.exports = async (parent, {id, latitude, longitude}) => {
    const updateObject = {
        "exif.gps.latitude": latitude,
        "exif.gps.longitude": longitude
    };

    const image = await getDB('images').update({_id: id}, { $set: updateObject}, { upsert: true, returnUpdatedDocs: true });

    return {
        id,
        ...image
    };
};