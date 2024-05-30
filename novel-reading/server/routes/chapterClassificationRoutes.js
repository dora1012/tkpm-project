const express = require('express');
const chapterClassificationController = require('../controllers/chapterClassificationController');
const router = express.Router();

router.get('/', chapterClassificationController.getChapterClassificationList);
router.get('/:classificationSlug', chapterClassificationController.getNovelListOfClassification);

module.exports = router;