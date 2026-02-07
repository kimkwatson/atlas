const mongodb = require('../db/connect');
const { ObjectId } = require("mongodb");

// get all landmarks
const getLandmarks = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('landmarks').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

// get one landmarks by id
const getLandmarkById = async (req, res) => {
    try {
        const db = mongodb.getDb().db();
        const landmarksCollection = db.collection("landmarks");

        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Missing id route parameter" });
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid id format"});
        }

        const landmark = await landmarksCollection.findOne({
            _id: new ObjectId(id)
        });

        if (!landmark) {
            return res.status(404).json({ error: err.message });
        }

        res.json(landmark);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// create new landmark
const createLandmark = async (req, res) => {
    const landmark = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        locationId: req.body.locationId,
        website: req.body.website
    };
    try {
        const db = mongodb.getDb().db();
        const landmarksCollection = db.collection("landmarks");
        const response = await landmarksCollection.insertOne(landmark);
        return res.status(201).json({ id: response.insertedId });
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
};

// update landmark by id (stub)
const updateLandmark = async (req, res) => {
    res.status(501).json({ message: 'updateLandmark not implemented'})
}

// delete landmark by id (stub)
const deleteLandmark = async (req, res) => {
    res.status(501).json({ message: 'deleteLocation not implemented'})
}

module.exports = { getLandmarks, createLandmark, getLandmarkById, updateLandmark, deleteLandmark };