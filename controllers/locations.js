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
const getLocationById = async (req, res) => {
    try {
        const db = mongodb.getDb().db();
        const locationsCollection = db.collection("locations");

        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Missing id route parameter" });
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid id format"});
        }

        const location = await locationsCollection.findOne({
            _id: new ObjectId(id)
        });

        if (!location) {
            return res.status(404).json({ error: err.message });
        }

        res.json(location);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// create new location
const createLocation = async (req, res) => {
    
    const location = {
        name: req.body.name,
        type: req.body.type,
        country: req.body.country,
        timezone: req.body.timezone,
        lat: req.body.lat,
        lon: req.body.lon
    };
    
    try {
        const db = mongodb.getDb().db();
        const locationsCollection = db.collection("locations");
        const response = await locationsCollection.insertOne(location);
        return res.status(201).json({ id: response.insertedId });
    } catch(err) {
        return res.status(500).json({ error: err.message });
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
            lon: req.body.lon
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