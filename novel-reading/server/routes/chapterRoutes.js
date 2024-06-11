const express = require('express');
const chapterController = require('../controllers/chapterController');
const novelController = require('../controllers/novelController');

const router = express.Router();

router.get('/:novelSlug/:chapterSlug/danh-sach-chuong', chapterController.getChapterList);
router.get('/:novelSlug/danh-sach-chuong', novelController.getAllChapters);
router.get('/:novelSlug/trang-:paginationSlug',novelController.getNovelInfor);
router.get('/:novelSlug/chuong-:chapterSlug', chapterController.getChapter);

module.exports = router;
