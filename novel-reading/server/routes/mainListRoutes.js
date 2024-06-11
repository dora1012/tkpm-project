const express = require('express');
const mainListController = require('../controllers/mainListController');
const router = express.Router();

// lấy số trang max của danh sách chính
router.get('/:listSlug/max-trang', mainListController.getMaxPaginationNumber);
// lấy list truyện của danh sách chính theo trang
router.get('/:listSlug/:paginationSlug', mainListController.getNovelListOfMainList);
// lấy list truyện của danh sách chính
router.get('/:listSlug', mainListController.getNovelListOfMainList);
// lấy list danh sách chính
router.get('/', mainListController.getMainList);

module.exports = router;