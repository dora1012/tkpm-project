const { crawlTruyenHot, crawlTruyenMoiCapNhat, crawlTruyenDaHoanThanh } = require('../services/crawlHomePage');
const { crawlNovelInfo, crawlAllChapters,crawlChapterPagination } = require('../services/crawlNovelInforPage')
const { defaultSource } = require('../config/sources');


// used for Home Page 
const getTruyen = (crawlFunction, errorMessage) => {
  return async (req, res) => {
    try {
      const result = await crawlFunction(defaultSource);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: errorMessage });
    }
  };
};

const getTruyenHot = getTruyen(crawlTruyenHot, 'Internal Server Error - TRUYEN HOT CONTROLLER');
const getTruyenMoiCapNhat = getTruyen(crawlTruyenMoiCapNhat, 'Internal Server Error - TRUYEN MOI CAP NHAT CONTROLLER');
const getTruyenDaHoanThanh = getTruyen(crawlTruyenDaHoanThanh, 'Internal Server Error - TRUYEN DA HOAN THANH CONTROLLER');





// used for Novel Infor Page
const getNovelInfor = async (req, res) => {
  try {
    const { novelSlug } = req.params;
    const url = `${defaultSource}/${novelSlug}/`
    const novelInfor = await crawlNovelInfo(url);
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
    const chapterList = await crawlAllChapters(url);
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
    const chapterList = await crawlChapterPagination(url);
    res.json(chapterList);  
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - CHAPTER LIST FOR EACH PAGINATION IN CONTROLLER' });
  }
};

module.exports = {
  getTruyenHot,
  getTruyenMoiCapNhat,
  getTruyenDaHoanThanh,
  getNovelInfor,
  getAllChapters,
  getChapterListForEachPagination
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