const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();

// Lấy số trang max của tác giả
router.get('/:authorSlug/max-trang', authorController.getMaxPaginationNumber);
// Lấy list truyện của tác giả
router.get('/:authorSlug/:paginationSlug', authorController.getNovelListOfAuthor);

module.exports = router;