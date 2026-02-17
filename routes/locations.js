const express = require('express');
const router = express.Router();

const locationsController = require('../controllers/locations');

/*** Locations Routes ***/

// get all locations
router.get('/', locationsController.getLocations);

// get one location by id
router.get('/:id', locationsController.getLocationById);

// create new location
router.post('/', locationsController.createLocation);

// update location by id
router.put('/:id', locationsController.updateLocation);

// delete location by id
router.delete('/:id', locationsController.deleteLocation);

module.exports = router;
