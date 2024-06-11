//const { crawlNovelList, crawlMaxPaginationNumber } = require('../services/crawlListPage');
const { defaultSource } = require('../config/sources');
const { encodeKeyword } = require('../utils/encodeKeyword');

const Crawler = require('../services/crawler');
const TruyenFull = require('../services/crawlerTruyenFull');
const crawler = new Crawler(new TruyenFull());

const getNovelListOfSearchResult = async (req, res) => {
  var keyword = req.query.tukhoa;
  var page = req.query.page;
  keyword = encodeKeyword(keyword);

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    let searchUrl;
    if (page === null || page === undefined) {
      searchUrl = `${defaultSource}/tim-kiem/?tukhoa=${keyword}`;
    }
    else {
      searchUrl = `${defaultSource}/tim-kiem/?tukhoa=${keyword}&page=${page}`;
    }
    const searchResults = await crawler.crawl(searchUrl, 'list');

    res.json(searchResults);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
};

const getMaxPaginationNumber = async (req, res) => {
  try {
    var keyword = req.query.tukhoa;
    var page = req.query.page;
    keyword = encodeKeyword(keyword);
    let searchUrl = `${defaultSource}/tim-kiem/?tukhoa=${keyword}`;
    //const num = await crawlMaxPaginationNumber(searchUrl);
    const num = await crawler.crawlWithAsyncHandles(searchUrl, 'max-pagination');
    res.json(num);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - MAX PAGE NUM OF AUTHOR CONTROLLER' });
  }
}

module.exports = {
  getNovelListOfSearchResult,
  getMaxPaginationNumber
};
