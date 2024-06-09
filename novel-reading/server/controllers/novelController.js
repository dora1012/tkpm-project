// const { crawlTruyenHot, crawlTruyenMoiCapNhat, crawlTruyenDaHoanThanh } = require('../services/crawlHomePage');
// const { crawlNovelInfo } = require('../services/crawlNovelInforPage')
const { defaultSource } = require('../config/sources');

const Crawler = require('../services/crawler');
const TruyenFull = require('../services/crawlerTruyenFull');

const crawler = new Crawler(new TruyenFull());

// const searchUrl=`${searchUrl}/tim-kiem`;

// used for Home Page 
const getTruyen = (type, errorMessage) => {
  return async (req, res) => {
    try {
      //const result = await crawlFunction(defaultSource);
      const result = await crawler.crawl(defaultSource, type);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: errorMessage });
    }
  };
};

const getTruyenHot = getTruyen('hot', 'Internal Server Error - TRUYEN HOT CONTROLLER');
const getTruyenMoiCapNhat = getTruyen('new', 'Internal Server Error - TRUYEN MOI CAP NHAT CONTROLLER');
const getTruyenDaHoanThanh = getTruyen('finished', 'Internal Server Error - TRUYEN DA HOAN THANH CONTROLLER');

// used for Novel Infor Page
const getNovelInfor = async (req, res) => {
  try {
    const { novelSlug } = req.params;
    const url = `${defaultSource}/${novelSlug}/`
    //const novelInfor = await crawlNovelInfo(url);
    const novelInfor = await crawler.crawl(url, 'info');
    res.json(novelInfor);  
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL INFOR CONTROLLER' });
  }
};

module.exports = {
  getTruyenHot,
  getTruyenMoiCapNhat,
  getTruyenDaHoanThanh,
  getNovelInfor
};
