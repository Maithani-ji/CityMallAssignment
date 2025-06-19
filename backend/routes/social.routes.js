const express = require('express');
const router = express.Router();
const { getSocialMedia } = require('../controllers/social.controller');

router.get('/:id/social-media', getSocialMedia);

module.exports = router;
