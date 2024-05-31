const express = require('express');
const chapterController = require('../controllers/chapterController');
const router = express.Router();

router.get('/:novelSlug/:chapterSlug', chapterController.getChapter);

module.exports = router;