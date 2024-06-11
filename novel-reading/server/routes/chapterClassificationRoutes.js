const express = require('express');
const chapterClassificationController = require('../controllers/chapterClassificationController');
const router = express.Router();

// lấy số trang max của phân loại chương
router.get('/:classificationSlug/max-trang', chapterClassificationController.getMaxPaginationNumber);
// lấy list truyện của phân loại chương theo trang
router.get('/:classificationSlug/:paginationSlug', chapterClassificationController.getNovelListOfClassification);
// lấy list truyện của phân loại chương
router.get('/:classificationSlug', chapterClassificationController.getNovelListOfClassification);
// lấy list phân loại chương
router.get('/', chapterClassificationController.getChapterClassificationList);

module.exports = router;