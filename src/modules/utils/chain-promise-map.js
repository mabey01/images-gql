module.exports = async (array, mappingFN) => {
    const response = [];
    for (let i = 0; i < array.length; i++) {
        response.push(await mappingFN(await array[i]));
    }

    return response;
};