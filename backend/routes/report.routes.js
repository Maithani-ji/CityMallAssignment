const express = require('express');
const router = express.Router();
const { submitReport,getReportsForDisaster } = require('../controllers/report.controller');

router.post('/:id/reports', submitReport); // POST /api/disasters/:id/reports

router.get('/:id/reports', getReportsForDisaster); // GET /api/disasters/:id/reports

module.exports = router;
