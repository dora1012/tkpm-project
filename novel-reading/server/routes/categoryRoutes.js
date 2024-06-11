const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

// lấy số trang max của thể loại
router.get('/:categorySlug/max-trang', categoryController.getMaxPaginationNumber);
// lấy list truyện của thể loại theo trang
router.get('/:categorySlug/:paginationSlug', categoryController.getNovelListOfCategory);
// lấy list truyện của thể loại
router.get('/:categorySlug', categoryController.getNovelListOfCategory);
// lấy list thể loại
router.get('/', categoryController.getCategoryList);

module.exports = router;