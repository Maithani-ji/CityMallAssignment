const express = require('express');
const router = express.Router();
const { getNearbyResources } = require('../controllers/resource.controller');

router.get('/:id/resources', getNearbyResources);

module.exports = router;
