const express = require('express');
const sourcesController = require('../controllers/sourcesController');
const router = express.Router();

// lấy list nguồn
router.get('/', sourcesController.getAllSources);

module.exports = router;