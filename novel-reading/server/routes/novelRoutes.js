const express = require('express');
const novelController = require('../controllers/novelController');
const chapterController = require('../controllers/chapterController');
const router = express.Router();

// lấy list truyện hot
router.get('/truyen-hot', novelController.getTruyenHot);
// lấy list truyện mới cập nhật
router.get('/truyen-moi-cap-nhat', novelController.getTruyenMoiCapNhat);
//  lấy list truyện đã hoàn thành
router.get('/truyen-da-hoan-thanh', novelController.getTruyenDaHoanThanh);
// lấy tất cả chương của truyện
router.get('/:novelSlug/danh-sach-chuong', novelController.getAllChapters);
// lấy số trang max của truyện
router.get('/:novelSlug/max-trang', novelController.getMaxPaginationNumber);
// lấy số chương max của truyện
router.get('/:novelSlug/max-chuong',novelController.getMaxChapter);
// lấy thông tin truyện theo trang
router.get('/:novelSlug/trang-:paginationSlug',novelController.getNovelInfor);
// lấy thông tin chương
router.get('/:novelSlug/chuong-:chapterSlug', chapterController.getChapter);
// lấy thông tin truyện
router.get('/:novelSlug', novelController.getNovelInfor);

module.exports = router;