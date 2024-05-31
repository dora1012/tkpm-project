const { crawlChapterClassificationList } = require('../services/crawlHomePage');
const { crawlNovelList } = require('../services/crawlListPage');
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
    const { classificationSlug } = req.params;
    const classificationUrl = `${defaultSource}/top-truyen/${classificationSlug}/`;
    const novels = await crawlNovelList(classificationUrl);
    res.json(novels);  
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL CLASSIFICATION LIST CONTROLLER' });
  }
};

module.exports = {
    getChapterClassificationList,
    getNovelListOfClassification
};
