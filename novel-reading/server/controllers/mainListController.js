// const { crawlMainList } = require('../services/crawlHomePage');
// const { crawlNovelList } = require('../services/crawlListPage');
const { defaultSource } = require('../config/sources');

const Crawler = require('../services/crawler');
const TruyenFull = require('../services/crawlerTruyenFull');

const crawler = new Crawler(new TruyenFull());

// used for Navigation Bar 
const getMainList = async (req, res) => {
  try {
    //const mainList = await crawlMainList(defaultSource);
    const mainList = await crawler.crawl(defaultSource, 'main');
    res.json(mainList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - MAIN LIST' });
  }
};

// used for Novel List of Each Type in MainList
const getNovelListOfMainList = async (req, res) => {
  try {
    var { listSlug } = req.params;
    if(listSlug === 'truyen-moi-cap-nhat') {
      listSlug = 'truyen-moi';
    }
    const listUrl = `${defaultSource}/danh-sach/${listSlug}/`;
    // const novels = await crawlNovelList(listUrl);
    const novels = await crawler.crawl(listUrl, 'list');
    res.json(novels);
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL MAIN LIST CONTROLLER' });
  }
};

module.exports = {
  getMainList,
  getNovelListOfMainList
};
