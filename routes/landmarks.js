const express = require('express');
const router = express.Router();

const landmarksController = require('../controllers/landmarks');

/*** Landmarks Routes ***/

// get all landmarks
router.get('/', landmarksController.getLandmarks);

// get one landmark by id
router.get('/:id', landmarksController.getLandmarkById);

// create new landmark
router.post('/', landmarksController.createLandmark);

// update landmark by id
router.put('/:id', landmarksController.updateLandmark);

// delete landmark by id
router.delete('/:id', landmarksController.deleteLandmark);

module.exports = router;
