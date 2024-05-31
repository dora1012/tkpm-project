const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.get('/:categorySlug', categoryController.getNovelListOfCategory);
router.get('/', categoryController.getCategoryList);

module.exports = router;