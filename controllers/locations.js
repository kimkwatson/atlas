const mongodb = require('../db/connect');
const { ObjectId } = require("mongodb");

// get all locations
const getLocations = async (req, res, next) => {
    try {
        const lists = await mongodb
            .getDb()
            .db()
            .collection('locations')
            .find()
            .toArray();

        return res.status(200).json(lists);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Some error occurred while retrieving locations." });
    }
};

// get one location by id
const getLocationById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format." });
        }

        const location = await mongodb
            .getDb()
            .db()
            .collection("locations")
            .findOne({ _id: new ObjectId(id) });

        if (!location) {
            return res.status(404).json({ message: "Location not found." });
        }

        return res.status(200).json(location);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Some error occurred while retrieving the location." });
    }
};

// create new location
const createLocation = async (req, res) => {
    try {
        const location = {
            name: req.body.name,
            type: req.body.type,
            country: req.body.country,
            timezone: req.body.timezone,
            lat: req.body.lat,
            lon: req.body.lon,
            currency: req.body.currency,
            population: req.body.population
        };

        const response = await mongodb
                    .getDb()
                    .db()
                    .collection("locations")
                    .insertOne(location);
        
                return res.status(201).json({ id: response.insertedId });
            } catch(err) {
                console.error(err);
                return res.status(500).json({ message: "Some error occurred while creating the location." });
            }
};

// update location by id
const updateLocation = async (req, res) => {
    try{
        const locationId = new ObjectId(req.params.id);
        
        const location = {
            name: req.body.name,
            type: req.body.type,
            country: req.body.country,
            timezone: req.body.timezone,
            lat: req.body.lat,
            lon: req.body.lon,
            currency: req.body.currency,
            population: req.body.population
        }
        
        const response = await mongodb
            .getDb()
            .db()
            .collection("locations")
            .replaceOne({ _id: locationId }, location);
        
            if (response.modifiedCount > 0) {
                return res.status(204).send();
        } else {
            return res.status(404).json({ message: "Location not found." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Some error occured while updating the location." });
    }
    
};

// delete location by id
const deleteLocation = async (req, res) => {
    try {
    const locationId = new ObjectId(req.params.id);

    const response = await mongodb.getDb().db().collection("locations").deleteOne({ _id: locationId });

    if (response.deletedCount > 0) {
        return res.status(204).send();
    } else {
        return res.status(404).json({ message: "Location not found." });
    }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Some error occurred while deleting the location." });
    }
};

module.exports = { getLocations, getLocationById, createLocation, updateLocation, deleteLocation };