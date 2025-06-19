const express = require('express');
const router = express.Router();
const { verifyImageHandler } = require('../controllers/verify.controller');

router.post('/:id/verify-image', verifyImageHandler);

module.exports = router;
