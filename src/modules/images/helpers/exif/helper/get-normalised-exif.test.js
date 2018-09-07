const expect = require('chai').expect;
const getNormalizedExif = require('./get-normalised-exif.js');

const map = {
    "foo": obj => obj['foo']
};

describe('a getNormalizedExif function', () => {
    it('a getNormalizedExif function with no params', () => {
        expect(getNormalizedExif()).to.eql({});
    });

    it('a getNormalizedExif function with just a map', () => {
        expect(getNormalizedExif(map)).to.eql({
            "foo": null
        });
    });

    it('a getNormalizedExif function with a map and object', () => {
        expect(getNormalizedExif(map, {'foo': 'bar'})).to.eql({
            "foo": "bar"
        });
    });

    it('a getNormalizedExif function with 0 as one of the values', () => {
        const expandedMap = {
            ...map,
            "null": () => 0
        };

        expect(getNormalizedExif(expandedMap, {'foo': 'bar'})).to.eql({
            "foo": "bar",
            "null": 0
        });
    });
});