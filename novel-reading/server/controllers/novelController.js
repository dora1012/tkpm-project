//const { crawlNovelInfo, crawlAllChapters, crawlChapterPagination } = require('../services/crawlNovelInforPage')
// const { crawlTruyenHot, crawlTruyenMoiCapNhat, crawlTruyenDaHoanThanh } = require('../services/crawlHomePage');
// const { crawlNovelInfo } = require('../services/crawlNovelInforPage')
// const { crawlMaxPaginationNumber } = require('../services/crawlListPage');
const { defaultSource } = require('../config/sources');
const { processChapterTitles } = require('../utils/processChapter');

const Crawler = require('../services/crawler');
const TruyenFull = require('../services/crawlerTruyenFull');

const crawler = new Crawler(new TruyenFull());

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
    const { novelSlug, paginationSlug } = req.params;
    let novelUrl;
    if (paginationSlug === null || paginationSlug === undefined) {
      novelUrl = `${defaultSource}/${novelSlug}/`;
    }
    else {
      novelUrl = `${defaultSource}/${novelSlug}/trang-${paginationSlug}`;
    }
    //const novelInfor = await crawlNovelInfo(url);
    let novelInfor = await crawler.crawl(novelUrl, 'info');
    //novelInfor.maxPagination = await crawler.crawlWithAsyncHandles(url, 'max-pagination');
    res.json(novelInfor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL INFOR CONTROLLER' });
  }
};


// get chapter list of novel
const getAllChapters = async (req, res) => {
  try {
    const { novelSlug } = req.params;
    const url = `${defaultSource}/${novelSlug}/`
    let chapterList = await crawler.crawlWithAsyncHandles(url, 'all-chapters');
    chapterList = processChapterTitles(chapterList);
    res.json(chapterList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL CONTROLLER - CHAPTER LIST' });
  }
};

// get chapter list for each pagination page
const getChapterListForEachPagination = async (req, res) => {
  try {
    const { novelSlug, paginationSlug } = req.params;
    const url = `${defaultSource}/${novelSlug}/trang-${paginationSlug}/#list-chapter`
    //const chapterList = await crawlChapterPagination(url);
    const chapterList = await crawler.crawl(url, 'chapter-pagination');
    res.json(chapterList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - CHAPTER LIST FOR EACH PAGINATION IN CONTROLLER' });
  }
};

const getMaxPaginationNumber = async (req, res) => {
  try {
    const { novelSlug } = req.params;
    let novelUrl = `${defaultSource}/${novelSlug}/`;
    //const num = await crawlMaxPaginationNumber(novelUrl);
    const num = await crawler.crawlWithAsyncHandles(novelUrl, 'max-pagination');
    res.json(num);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - MAX PAGE NUM OF NOVEL CONTROLLER' });
  }

}

module.exports = {
  getTruyenHot,
  getTruyenMoiCapNhat,
  getTruyenDaHoanThanh,
  getNovelInfor,
  getAllChapters,
  getChapterListForEachPagination,
  getMaxPaginationNumber
};

// TEST
// (async () => {
//   const source = 'https://truyenfull.vn/bia-do-dan-phan-cong/trang-4/#list-chapter';
//   try {
//       const infor = await crawlChapterPagination(source);
//       //console.log(infor);
//   } catch (error) {
//       console.error('Error fetching novel content:', error);
//   }
// })();