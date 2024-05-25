const express = require('express');
const router = express.Router();
const { searchController } = require('../controllers/searchController'); // Adjust the path as needed

// Search route
router.get('/search', searchController);

module.exports = router;
