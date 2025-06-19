const express = require('express');
const router = express.Router();
const { geocodeHandler } = require('../controllers/geo.controller');

router.post('/', geocodeHandler);

module.exports = router;