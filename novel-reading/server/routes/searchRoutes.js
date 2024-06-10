const express = require('express');
const searchController = require('../controllers/searchController');
const router = express.Router();

router.get('/max-trang', searchController.getMaxPaginationNumber);
router.get('/', searchController.getNovelListOfSearchResult);

module.exports = router;