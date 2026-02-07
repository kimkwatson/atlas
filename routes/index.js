const express = require('express');
const router = express.Router();

const locationsController = require('../controllers/locations');
const landmarksController = require('../controllers/landmarks');

// GET all locations
router.get('/locations', locationsController.getLocations);

// GET all landmarks
router.get('/landmarks', landmarksController.getLandmarks);
//router.get('/landmarks', landmarksController.getLandmarks);

// POST new location

// POST new landmark

module.exports = router;