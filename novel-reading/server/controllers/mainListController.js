const { crawlNovelList,crawlMaxPaginationNumber } = require('../services/crawlListPage');
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
    var { listSlug, paginationSlug } = req.params;
    if(listSlug === 'truyen-moi-cap-nhat') {
      listSlug = 'truyen-moi';
    }
    let listUrl;
    if (paginationSlug === null || paginationSlug === undefined) {
      listUrl = `${defaultSource}/danh-sach/${listSlug}/`;
    }
    else{
      listUrl = `${defaultSource}/danh-sach/${listSlug}/${paginationSlug}/`;
    }
    const novels = await crawler.crawl(listUrl, 'list');
    res.json(novels);
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL MAIN LIST CONTROLLER' });
  }
};

const getMaxPaginationNumber = async(req,res)=>{
  try{
    const { listSlug } = req.params;
    if(listSlug === 'truyen-moi-cap-nhat') {
      listSlug = 'truyen-moi';
    }
    let listUrl = `${defaultSource}/danh-sach/${listSlug}/`;
    const num = await crawlMaxPaginationNumber(listUrl);
    res.json(num); 
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - MAX PAGE NUM OF MAIN LIST CONTROLLER' });
  }
}

module.exports = {
  getMainList,
  getNovelListOfMainList,
  getMaxPaginationNumber
};
