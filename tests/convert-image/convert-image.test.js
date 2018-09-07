const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const convertImage = require('../../src/modules/images/helpers/convert-image/index.js');

const TEST_DIR = path.join(__dirname, '/testing');
const TEST_IMAGE = path.join(TEST_DIR, '/test.jpg');
const TEST_SOURCE_IMAGE = path.join(__dirname, '/test.jpg');

describe('a convertImage function', () => {
    beforeEach(() => {
        fse.ensureDirSync(TEST_DIR);
        fse.copySync(TEST_SOURCE_IMAGE, TEST_IMAGE)
    });

    afterEach(() => {
        fse.removeSync(TEST_DIR);
    });

    it.skip('async await', async () => {
        expect.assertions(1);
        const createdFiles = await convertImage(TEST_IMAGE, TEST_DIR);
        console.log(createdFiles);

        expect(createdFiles.length).toBeGreaterThan(0);
    });
});