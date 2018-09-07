module.exports = {
    gps: obj => {
        if (!obj['GPSLatitude'] && !obj['GPSLongitude']) return null;

        return {
            latitudeRef: obj['GPSLatitudeRef'],
            latitude: obj['GPSLatitude'],
            longitudeRef: obj['GPSLongitudeRef'],
            longitude: obj['GPSLongitude'],
            altitudeRef: obj['GPSAltitudeRef'],
            altitude: obj['GPSAltitude'],

            position: obj['GPSPosition'],

            speedRef: obj['GPSSpeedRef'],
            speed: obj['GPSSpeed'],

            bearingRef: obj['GPSDestBearingRef'],
            bearing: obj['GPSDestBearing'],

            directionRef: obj['GPSImgDirectionRef'],
            direction: obj['GPSImgDirection'],

            positionError: obj['GPSHPositioningError']
        }
    }
};