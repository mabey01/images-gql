const fs = require('fs');

module.exports = async (stream, filePath) => {
    return await new Promise((resolve, reject) => {
        const saveStream = fs.createWriteStream(filePath);
        saveStream.on('finish', () => {
            console.log('All writes are now complete.');
            resolve(filePath);
        });

        saveStream.on('error', () => {
            console.log('Error');
            reject(filePath);
        });

        stream.pipe(saveStream);
    })
};