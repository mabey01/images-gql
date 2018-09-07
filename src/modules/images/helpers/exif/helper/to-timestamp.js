module.exports = exifDateTime => new Date(
    exifDateTime.year,
    exifDateTime.month - 1,
    exifDateTime.day,
    exifDateTime.hour,
    exifDateTime.minute,
    exifDateTime.second,
    exifDateTime.millis,
).getTime();