const express = require('express');
const chapterClassificationController = require('../controllers/chapterClassificationController');
const router = express.Router();

router.get('/phan-loai', chapterClassificationController.getChapterClassificationList);
router.get('/phan-loai/:classificationSlug', chapterClassificationController.getNovelListOfClassification);

module.exports = router;