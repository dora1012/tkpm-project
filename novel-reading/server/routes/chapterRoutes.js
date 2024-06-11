const express = require('express');
const chapterController = require('../controllers/chapterController');
const novelController = require('../controllers/novelController');

const router = express.Router();

// lấy list chương trong truyện
router.get('/:novelSlug/:chapterSlug/danh-sach-chuong', chapterController.getChapterList);
// lấy tất cả chương của truyện
router.get('/:novelSlug/danh-sach-chuong', novelController.getAllChapters);
// lấy thông tin truyện theo trang
router.get('/:novelSlug/trang-:paginationSlug',novelController.getNovelInfor);
// lấy thông tin chương
router.get('/:novelSlug/chuong-:chapterSlug', chapterController.getChapter);

module.exports = router;
