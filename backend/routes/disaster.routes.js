const express = require('express');
const router = express.Router();
const {
  getDisasters,
  createDisaster,
  updateDisaster,
  deleteDisaster,
} = require('../controllers/disaster.controller');

router.get('/', getDisasters);
router.post('/', createDisaster);
router.put('/:id', updateDisaster);
router.delete('/:id', deleteDisaster);

module.exports = router;
