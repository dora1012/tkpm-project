const express = require('express');
const mainListController = require('../controllers/mainListController');
const router = express.Router();

router.get('/:listSlug/max-trang', mainListController.getMaxPaginationNumber);
router.get('/:listSlug/:paginationSlug', mainListController.getNovelListOfMainList);
router.get('/:listSlug', mainListController.getNovelListOfMainList);
router.get('/', mainListController.getMainList);

module.exports = router;