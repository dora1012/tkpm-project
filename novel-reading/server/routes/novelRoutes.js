const express = require('express');
const novelController = require('../controllers/novelController');
const chapterController = require('../controllers/chapterController');
const router = express.Router();

router.get('/truyen-hot', novelController.getTruyenHot);
router.get('/truyen-moi-cap-nhat', novelController.getTruyenMoiCapNhat);
router.get('/truyen-da-hoan-thanh', novelController.getTruyenDaHoanThanh);
router.get('/:novelSlug/danh-sach-chuong', novelController.getAllChapters);
router.get('/:novelSlug/max-trang', novelController.getMaxPaginationNumber);
router.get('/:novelSlug/trang-:paginationSlug',novelController.getChapterListForEachPagination);
router.get('/:novelSlug/chuong-:chapterSlug', chapterController.getChapter);
router.get('/:novelSlug', novelController.getNovelInfor);

module.exports = router;