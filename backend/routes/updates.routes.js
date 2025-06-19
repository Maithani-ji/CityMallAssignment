const express = require('express');
const router = express.Router();
const { getOfficialUpdates } = require('../controllers/updates.controller');

router.get('/:id/official-updates', getOfficialUpdates);

module.exports = router;
