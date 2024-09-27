const express = require('express');
const router = express.Router();
const listingController = require('../Controller/listing');

router
    .post('/listings', listingController.createListing)
    .get('/listings', listingController.getListings)
    .get('/listings/:id', listingController.getListing)
    .put('/listings/:id', listingController.replaceListing)
    .patch('/listings/:id', listingController.updateListing)
    .delete('/listings/:id', listingController.deleteListing)

// Export the routes
exports.routes = router;
