const { getDB } = require('../../database/init.js');

module.exports = () => getDB('albums');