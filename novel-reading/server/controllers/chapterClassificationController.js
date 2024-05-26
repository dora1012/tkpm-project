const {  crawlChapterClassificationList } = require('../services/novelCrawl');
const { defaultSource } = require('../config/sources');


// used for Navigation Bar 
const  getChapterClassificationList= async (req, res) => {
  try {
    const chapterClassificationList = await crawlChapterClassificationList(defaultSource);
    res.json(chapterClassificationList);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - TRUYEN DA HOAN THANH' });
  }
};

module.exports = {
    getChapterClassificationList,
};
