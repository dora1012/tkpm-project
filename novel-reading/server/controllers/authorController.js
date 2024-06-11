//const { crawlNovelList } = require('../services/crawlListPage');
const { defaultSource } = require('../config/sources');
const Crawler = require('../services/crawler');
const TruyenFull = require('../services/crawlerTruyenFull');

const crawler = new Crawler(new TruyenFull());

// used for Novel List of A Author
const getNovelListOfAuthor = async (req, res) => {
  try {
    const { authorSlug, paginationSlug } = req.params;
    let authorUrl;
    if (paginationSlug === null || paginationSlug === undefined) {
      authorUrl = `${defaultSource}/tac-gia/${authorSlug}/`;
    }
    else {
      authorUrl = `${defaultSource}/tac-gia/${authorSlug}/${paginationSlug}/`;
    }
    const novels = await crawler.crawl(authorUrl, 'list');
    res.json(novels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL LIST OF AUTHOR CONTROLLER' });
  }
};

const getMaxPaginationNumber = async (req, res) => {
  try {
    const { authorSlug } = req.params;
    let authorUrl = `${defaultSource}/tac-gia/${authorSlug}/`;
    // const num = await crawlMaxPaginationNumber(authorUrl);
    const num = await crawler.crawlWithAsyncHandles(authorUrl, 'max-pagination');
    res.json(num);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - MAX PAGE NUM OF AUTHOR CONTROLLER' });
  }
}
module.exports = {
  getNovelListOfAuthor,
  getMaxPaginationNumber
};
