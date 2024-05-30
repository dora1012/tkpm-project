const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.get('/', categoryController.getCategoryList);
router.get('/:categorySlug', categoryController.getNovelListOfCategory);

module.exports = router;