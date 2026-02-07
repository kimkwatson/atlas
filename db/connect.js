const { MongoClient } = require('mongodb');

let _db;

const initDb = async () => {
    if (_db) {
        console.log('Db is already initialized!');
        return _db;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    _db = client;
    return _db;
};

const getDb = () => {
    if (!_db) {
        throw new Error('Database not initialized');
    }
    return _db;
};

module.exports = { initDb, getDb };