//const { crawlChapterClassificationList } = require('../services/crawlHomePage');
//const { crawlNovelList, crawlMaxPaginationNumber } = require('../services/crawlListPage');

const { defaultSource } = require('../config/sources');

const Crawler = require('../services/crawler');
const TruyenFull = require('../services/crawlerTruyenFull');

const crawler = new Crawler(new TruyenFull());

// used for Navigation Bar 
const getChapterClassificationList = async (req, res) => {
  try {
    //const chapterClassificationList = await crawlChapterClassificationList(defaultSource);
    const chapterClassificationList = await crawler.crawl(defaultSource, 'classification');
    res.json(chapterClassificationList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - CLASSIFICATION LIST CONTROLLER' });
  }
};

// used for Classification List of Each Type in Classification
const getNovelListOfClassification = async (req, res) => {
  try {
    const { classificationSlug, paginationSlug } = req.params;
    let classificationUrl;
    if (paginationSlug === null || paginationSlug === undefined) {
      classificationUrl = `${defaultSource}/top-truyen/${classificationSlug}/`;
    }
    else {
      classificationUrl = `${defaultSource}/top-truyen/${classificationSlug}/${paginationSlug}/`;
    }
    const novels = await crawler.crawl(classificationUrl, 'list');
    res.json(novels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL CLASSIFICATION LIST CONTROLLER' });
  }
};

const getMaxPaginationNumber = async (req, res) => {
  try {
    const { classificationSlug } = req.params;
    let classificationUrl = `${defaultSource}/top-truyen/${classificationSlug}/`;
    // const num = await crawlMaxPaginationNumber(classificationUrl);
    const num = await crawler.crawlWithAsyncHandles(classificationUrl, 'max-pagination');
    res.json(num);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - MAX PAGE NUM OF CLASSFICATION CONTROLLER' });
  }
}


module.exports = {
  getChapterClassificationList,
  getNovelListOfClassification,
  getMaxPaginationNumber
};
