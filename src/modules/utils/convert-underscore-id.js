module.exports = obj => {
    if (!obj) return null;

    const {_id, ...convertedObj} = obj;

    return {
        id: _id,
        ...convertedObj
    }
};