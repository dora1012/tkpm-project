const express = require('express');
const { getTruyenMoiCapNhat, getTruyenDaHoanThanh } = require('../controllers/novelController');
const router = express.Router();

// Define the route to fetch Truyen Moi Cap Nhat novels
router.get('/novels/new', getTruyenMoiCapNhat);

// Define the route to fetch Truyen Da Hoan Thanh novels
router.get('/novels/completed', getTruyenDaHoanThanh);

module.exports = router;


