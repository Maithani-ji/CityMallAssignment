const express = require('express');
const router = express.Router();

// Import modular routes
const disasterRoutes = require('./disaster.routes');
const geocodeRoutes = require('./geo.routes');
const socialRoutes = require('./social.routes');
const verifyRoutes = require('./verify.routes');
const resourceRoutes = require('./resource.routes');
const officialRoutes = require('./updates.routes');
const reportRoutes = require('./report.routes');


router.use('/disasters', disasterRoutes);
router.use('/geocode', geocodeRoutes);
router.use('/disasters', socialRoutes); // So final route = /disasters/:id/social-media
router.use('/disasters', verifyRoutes); // now supports /disasters/:id/verify-image
router.use('/disasters', resourceRoutes);
router.use('/disasters', officialRoutes); // keep consistent nesting
router.use('/disasters', reportRoutes);

module.exports = router;
