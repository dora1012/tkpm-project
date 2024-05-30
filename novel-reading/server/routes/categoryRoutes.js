const express = require('express');
const {getCategoryList, getNovelListOfCategory} = require('../controllers/categoryController');
const router = express.Router();

router.get('/the-loai', getCategoryList);
router.get('/the-loai/:categorySlug', getNovelListOfCategory);

module.exports = router;