const mongodb = require('../db/connect');
const { ObjectId } = require("mongodb");

// get all landmarks
const getLandmarks = async (req, res, next) => {
    try {
            const lists = await mongodb
                .getDb()
                .db()
                .collection('landmarks')
                .find()
                .toArray();
    
            return res.status(200).json(lists);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Some error occurred while retrieving landmarks." });
        }
};

// get one landmark by id
const getLandmarkById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format." });
        }

        const landmark = await mongodb
            .getDb()
            .db()
            .collection("landmarks")
            .findOne({ _id: new ObjectId(id) });

        if (!landmark) {
            return res.status(404).json({ message: "Landmark not found." });
        }

        return res.status(200).json(landmark);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Some error occurred while retrieving the landmark." });
    }
};

// create new landmark
const createLandmark = async (req, res) => {
    try {
        const landmark = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            locationId: req.body.locationId,
            website: req.body.website
        };
    
        const response = await mongodb
            .getDb()
            .db()
            .collection("landmarks")
            .insertOne(landmark);

        return res.status(201).json({ id: response.insertedId });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Some error occurred while creating the landmark." });
    }
};

// update landmark by id
const updateLandmark = async (req, res) => {
    try{
        const landmarkId = new ObjectId(req.params.id);

        const landmark = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            locationId: req.body.locationId,
            website: req.body.website
        };
        
        const response = await mongodb
            .getDb()
            .db()
            .collection("landmarks")
            .replaceOne({ _id: landmarkId }, landmark);

            if (response.modifiedCount > 0) {
                return res.status(204).send();
            } else {
                return res.status(404).json({ message: "Landmark not found."});
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Some error occurred while updating the landmark." });
        }
};

// delete landmark by id
const deleteLandmark = async (req, res) => {
    try {
        const landmarkId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db().collection("landmarks").deleteOne({ _id: landmarkId });

        if (response.deletedCount > 0) {
            return res.status(200).send();
        } else {
            return res.status(404).json({ message: "Landmark not found." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Some error occurred while deleting the landmark." });
    }
};

module.exports = { getLandmarks, createLandmark, getLandmarkById, updateLandmark, deleteLandmark };