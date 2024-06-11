//const { crawlCategoryList } = require('../services/crawlHomePage');
const { crawlNovelList,crawlMaxPaginationNumber } = require('../services/crawlListPage');

const { defaultSource } = require('../config/sources');

const Crawler = require('../services/crawler');
const TruyenFull = require('../services/crawlerTruyenFull');

const crawler = new Crawler(new TruyenFull());

// used for Navigation Bar 
const getCategoryList = async (req, res) => {
  try {
    //const categoryList = await crawlCategoryList(defaultSource);
    const categoryList = await crawler.crawl(defaultSource, 'category');
    res.json(categoryList);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - CATEGORY LIST CONTROLLER' });
  }
};


// used for Novel List of Each Type in CategoryList
const getNovelListOfCategory = async (req, res) => {
  try {
    const { categorySlug, paginationSlug } = req.params;
    let categoryUrl;
    if (paginationSlug === null || paginationSlug === undefined) {
      categoryUrl = `${defaultSource}/the-loai/${categorySlug}/`;
    }
    else{
      categoryUrl = `${defaultSource}/the-loai/${categorySlug}/${paginationSlug}/`;
    }
    let novels = await crawler.crawl(categoryUrl, 'list');
    novels.splice(5, 1);
    res.json(novels);  
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL CATEGORY LIST CONTROLLER' });
  }
};


const getMaxPaginationNumber = async(req,res)=>{
  try{
    const { categorySlug } = req.params;
    let categoryUrl = `${defaultSource}/the-loai/${categorySlug}/`;
    const num = await crawlMaxPaginationNumber(categoryUrl);
    res.json(num); 
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - MAX PAGE NUM OF AUTHOR CONTROLLER' });
  }
}

module.exports = {
  getCategoryList,
  getNovelListOfCategory,
  getMaxPaginationNumber
};
