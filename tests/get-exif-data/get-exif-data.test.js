const path = require('path');
const expect = require('chai').expect;

const getExifData = require('../../src/modules/images/helpers/exif/get-exif-data.js');

const images = {
    'iPhone5': path.join(__dirname, '/apple-iPhone5.jpg'),
    'iPhone5withNoGps': path.join(__dirname, '/apple-iPhone5-with-no-gps.jpg'),
    'iPhone6': path.join(__dirname, '/apple-iPhone6.jpg'),
    'iPad': path.join(__dirname, '/apple-iPad.jpg'),
    'rx100': path.join(__dirname, '/sony-rx100.jpg'),
};

describe.only('a getExifData function', () => {
    it('should return empty object if params are missing', async () => {
        const exif = await getExifData();

        expect(exif).to.eql({});
    });

    Object.values(images).forEach(testFile => {
        it('should return all standart exif data for ' + testFile, async () => {
            const exif = await getExifData(testFile);

            expect(exif.camera).to.be.a('string').that.is.not.empty;
            expect(exif.model).to.be.a('string').that.is.not.empty;
            expect(exif.lensInfo).to.be.a('string').that.is.not.empty;

            expect(exif.originalFileName).to.be.a('string').that.is.not.empty;
            expect(exif.megapixels).to.be.above(0);
            expect(exif.dimensions).to.be.an('object').that.is.not.empty;
            expect(exif.orientation).to.be.a('string').that.is.not.empty;
            expect(exif.dateTimeOriginal).to.be.within(2, new Date().getTime());

            expect(exif.iso).to.be.above(0);
            expect(exif.shutterSpeed).to.be.a('string').that.is.not.empty;
            expect(exif.aperture).to.be.above(0);
            expect(exif.focalLength).to.be.above(0);
            expect(exif.focalLengthIn35).to.be.above(0);
            expect(exif.fov).to.be.above(0);

            expect(exif.meteringMode).to.be.a('string').that.is.not.empty;
            expect(exif.program).to.be.a('string').that.is.not.empty;
        });
    });

    it('should gather additional exif for rx100', async () => {
        const exif = await getExifData(images['rx100']);

        expect(exif.ambientTemperature).to.be.a('string').that.is.not.empty;
        expect(exif.cameraTemperature).to.be.a('string').that.is.not.empty;
    });

    [images['iPhone5'], images['iPhone6'], images['iPad']].forEach(testImage => {
        it('should gather GPS information for ' + testImage, async () => {
            const {gps} = await getExifData(testImage);

            expect(gps).to.be.a('object').that.is.not.empty;
            expect(gps.latitudeRef).to.be.a('string').that.is.not.empty;
            expect(gps.latitude).to.be.a('number');

            expect(gps.longitudeRef).to.be.a('string').that.is.not.empty;
            expect(gps.longitude).to.be.a('number');
            expect(gps.altitudeRef).to.be.a('string').that.is.not.empty;
            expect(gps.altitude).to.be.a('string').that.is.not.empty;

            expect(gps.position).to.be.a('string').that.is.not.empty;

            expect(gps.speedRef).to.be.a('string').that.is.not.empty;
            expect(gps.speed).to.be.a('number');

            expect(gps.bearingRef).to.be.a('string').that.is.not.empty;
            expect(gps.bearing).to.be.a('number');
            expect(gps.directionRef).to.be.a('string').that.is.not.empty;
            expect(gps.direction).to.be.a('number');

            expect(gps.positionError).to.be.a('string').that.is.not.empty;
        });
    });

    it('should return null if no gps information are given', async () => {
        const exif = await getExifData(images['iPhone5withNoGps']);

        expect(exif.gps).to.eql(null);
    });
});