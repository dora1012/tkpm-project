const { crawlCategoryList } = require('../services/crawlHomePage');
const {crawlNovelList } = require('../services/crawlListPage');

const { defaultSource } = require('../config/sources');



const getCategoryList = async (req, res) => {
  try {
    const categoryList = await crawlCategoryList(defaultSource);
    res.json(categoryList);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - CATEGORY LIST' });
  }
};

getNovelMainList
// used for Novel List of Each Type in CategoryList
const getNovelCategoryList= async (req, res) => {
  try {
    const{slug, categorySlug } =req.params;
    const url= `${defaultSource}/${slug}/${categorySlug}/`
    const novels = await crawlNovelList(url);
    res.json(novels);  
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL CATEGORY LIST CONTROLLER' });
  }
};

module.exports = {
    getCategoryList,
    getNovelCategoryList
};
