module.exports = function getNormalizedExif (map = {}, exifDataObject = {}) {
    return Object.entries(map).reduce((normalizedExifDataObject, [key, valueMapper]) => {
        const value = valueMapper(exifDataObject);
        if (value === undefined) {
            console.warn('empty exif value');
            normalizedExifDataObject[key] = null;
        } else {
            normalizedExifDataObject[key] = value;
        }

        return normalizedExifDataObject;
    }, {});
};