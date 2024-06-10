const { crawlChapterClassificationList } = require('../services/crawlHomePage');
const { crawlNovelList,crawlMaxPaginationNumber } = require('../services/crawlListPage');
const { defaultSource } = require('../config/sources');

// used for Navigation Bar 
const getChapterClassificationList = async (req, res) => {
  try {
    const chapterClassificationList = await crawlChapterClassificationList(defaultSource);
    res.json(chapterClassificationList);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - CLASSIFICATION LIST CONTROLLER' });
  }
};

// used for Classification List of Each Type in Classification
const getNovelListOfClassification = async (req, res) => {
  try {
    const { classificationSlug,paginationSlug } = req.params;
    let classificationUrl;
    if (paginationSlug === null || paginationSlug === undefined) {
      classificationUrl = `${defaultSource}/top-truyen/${classificationSlug}/`;
    }
    else{
      classificationUrl = `${defaultSource}/top-truyen/${classificationSlug}/${paginationSlug}/`;
    }
    const novels = await crawlNovelList(classificationUrl);
    res.json(novels);  
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL CLASSIFICATION LIST CONTROLLER' });
  }
};

const getMaxPaginationNumber = async(req,res)=>{
  try{
    const { classificationSlug } = req.params;
    let classificationUrl = `${defaultSource}/top-truyen/${classificationSlug}/`;
    const num = await crawlMaxPaginationNumber(classificationUrl);
    res.json(num); 
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - MAX PAGE NUM OF CLASSFICATION CONTROLLER' });
  }
}


module.exports = {
    getChapterClassificationList,
    getNovelListOfClassification,
    getMaxPaginationNumber
};
