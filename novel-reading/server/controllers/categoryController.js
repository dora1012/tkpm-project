const {crawlCategoryList} = require('../services/crawlHomePage');
const {crawlNovelList} = require('../services/crawlListPage');

const {defaultSource} = require('../config/sources');


// used for Navigation Bar 
const getCategoryList = async (req, res) => {
  try {
    const categoryList = await crawlCategoryList(defaultSource);
    res.json(categoryList);  
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error - CATEGORY LIST CONTROLLER'});
  }
};


// used for Novel List of Each Type in CategoryList
const getNovelListOfCategory = async (req, res) => {
  try {
    const{categorySlug} = req.params;
    const categoryUrl = `${defaultSource}/the-loai/${categorySlug}/`;
    const novels = await crawlNovelList(categoryUrl);
    res.json(novels);  
  } catch (error) {  
    console.error(error);
    res.status(500).json({error: 'Internal Server Error - NOVEL CATEGORY LIST CONTROLLER'});
  }
};

module.exports = {
  getCategoryList,
  getNovelListOfCategory
};
