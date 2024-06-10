const express = require('express');
const chapterClassificationController = require('../controllers/chapterClassificationController');
const router = express.Router();

router.get('/:classificationSlug/max-trang', chapterClassificationController.getMaxPaginationNumber);
router.get('/:classificationSlug/:paginationSlug', chapterClassificationController.getNovelListOfClassification);
router.get('/:classificationSlug', chapterClassificationController.getNovelListOfClassification);
router.get('/', chapterClassificationController.getChapterClassificationList);

module.exports = router;