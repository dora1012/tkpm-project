const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();

router.get('/:authorSlug/max-trang', authorController.getMaxPaginationNumber);
router.get('/:authorSlug/:paginationSlug', authorController.getNovelListOfAuthor);

module.exports = router;