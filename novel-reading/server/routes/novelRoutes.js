const express = require('express');
const novelController = require('../controllers/novelController');
const router = express.Router();

router.get('/truyen-hot', novelController.getTruyenHot);
router.get('/truyen-moi-cap-nhat', novelController.getTruyenMoiCapNhat);
router.get('/truyen-da-hoan-thanh', novelController.getTruyenDaHoanThanh);
router.get('/:novelSlug', novelController.getNovelInfor);

module.exports = router;