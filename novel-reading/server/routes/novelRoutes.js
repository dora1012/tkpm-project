const express = require('express');
const novelController = require('../controllers/novelController');
const chapterController = require('../controllers/chapterController');
const router = express.Router();

router.get('/truyen-hot', novelController.getTruyenHot);
router.get('/truyen-moi-cap-nhat', novelController.getTruyenMoiCapNhat);
router.get('/truyen-da-hoan-thanh', novelController.getTruyenDaHoanThanh);
router.get('/:novelSlug', novelController.getNovelInfor);
router.get('/:novelSlug/:chapterSlug', chapterController.getChapter);

module.exports = router;