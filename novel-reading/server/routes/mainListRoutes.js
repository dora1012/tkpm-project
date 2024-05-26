const express = require('express');
const {getMainList} = require('../controllers/mainListController');
const router = express.Router();

router.get('/danh-sach', getMainList);

router.get('/danh-sach/:listSlug', getNovelListOfMainList);

module.exports = router;