const Datastore = require('nedb-promises');

let dbs = {};

function initDB (name) {
    const db = Datastore.create({filename: name + '.db', autoload: true});
    dbs[name] = db;
    return db;
}

module.exports = {
    getDB: (name) => {
        if (dbs[name]) {
            return dbs[name];
        }

        return initDB(name);
    }
};