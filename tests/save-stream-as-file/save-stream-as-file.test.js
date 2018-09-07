const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const expect = require('chai').expect;

const saveStreamAsFile = require('../../src/modules/utils/save-stream-as-file.js');

const TEST_DIR = path.join(__dirname, '/testing');
const TEST_IMAGE = path.join(TEST_DIR, '/test.jpg');
const TEST_SOURCE_IMAGE = path.join(__dirname, '/test.jpg');

describe('a saveStreamAsFile function', () => {
    beforeEach(() => {
        fse.ensureDirSync(TEST_DIR);
        fse.copySync(TEST_SOURCE_IMAGE, TEST_IMAGE)
    });

    afterEach(() => {
        // fse.removeSync(TEST_DIR);
    });

    it.skip('should save a stream to a specified file', async () => {
        const stream = fs.createReadStream(TEST_IMAGE);
        const savedImagePath = path.join(TEST_DIR, 'savedStream.jpg');
        const savedFile = await saveStreamAsFile(stream, savedImagePath);

        expect(savedFile).to.equal(savedImagePath);
        expect(fse.ensureFileSync(savedFile)).to.be.true;
    });
});