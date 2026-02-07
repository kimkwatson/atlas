const express = require('express');
const router = express.Router();

const locationsController = require('../controllers/locations');
const landmarksController = require('../controllers/landmarks');

/*** Locations Routes ***/

// get all locations
router.get('/locations', locationsController.getLocations);

// get one location by id
router.get('/locations/:id', locationsController.getLocationById);

// create new location
router.post('/locations', locationsController.createLocation);

// update location by id
router.put('/locations/:id', locationsController.updateLocation);

// delete location by id
router.delete('/locations/:id', locationsController.deleteLocation);


/*** Landmarks Routes ***/

// get all landmarks
router.get('/landmarks', landmarksController.getLandmarks);

// get one landmark by id
router.get('/landmarks/:id', landmarksController.getLandmarkById);

// create new landmark
router.post('/landmarks', landmarksController.createLandmark);

// update landmark by id
router.put('/landmarks/:id', landmarksController.updateLandmark);

// delete landmark by id
router.delete('/landmarks/:id', landmarksController.deleteLandmark);

module.exports = router;