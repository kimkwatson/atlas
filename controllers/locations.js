const mongodb = require('../db/connect');
const { ObjectId } = require("mongodb");

// get all locations
const getLocations = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('locations').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

// get one location by id
// create new location
// update location by id
// delete location by id

module.exports = { getLocations };