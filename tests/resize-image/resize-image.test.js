const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const should = require('chai').should();
const expect = require('chai').expect;

const resizeImage = require('../../src/modules/images/helpers/resize-image/resize-image.js');

const TEST_DIR = path.join(__dirname, '/testing');
const TEST_IMAGE = path.join(TEST_DIR, '/test.jpg');
const TEST_SOURCE_IMAGE = path.join(__dirname, '/test.jpg');


describe('a resize function', () => {
    beforeEach(() => {
        fse.ensureDirSync(TEST_DIR);
        fse.copySync(TEST_SOURCE_IMAGE, TEST_IMAGE)
    });

    afterEach(() => {
        console.log('after');
        fse.removeSync(TEST_DIR);
    });

    it('should resize an image to 200 width', async () => {
        const width = 200;
        const outputFile = path.join(TEST_DIR, 'resized.jpg');

        const createdFile = await resizeImage({
            inputFile: TEST_IMAGE,
            outputFile,
            width
        });

        expect(createdFile.filePath).to.equal(outputFile);
        expect(createdFile.width).to.equal(width);
        expect(createdFile.height).not.to.equal(width);
    });

    it('should make a square thumbnail', async () => {
        const size = 200;
        const outputFile = path.join(TEST_DIR, 'resized_square.jpg');

        const createdFile = await resizeImage({
            inputFile: TEST_IMAGE,
            outputFile: outputFile,
            width: size,
            height: size
        });

        expect(createdFile.filePath).to.equal(outputFile);
        expect(createdFile.width).to.equal(size);
        expect(createdFile.height).to.equal(size);
    });
});