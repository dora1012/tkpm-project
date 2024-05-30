const express = require('express');
const mainListController = require('../controllers/mainListController');
const router = express.Router();

router.get('/', mainListController.getMainList);
router.get('/:listSlug', mainListController.getNovelListOfMainList);

module.exports = router;