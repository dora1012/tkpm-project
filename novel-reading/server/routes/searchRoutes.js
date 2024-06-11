const express = require('express');
const searchController = require('../controllers/searchController');
const router = express.Router();

// lấy số trang max của kết quả tìm kiếm
router.get('/max-trang', searchController.getMaxPaginationNumber);
// lấy list truyện của kết quả tìm kiếm
router.get('/', searchController.getNovelListOfSearchResult);

module.exports = router;