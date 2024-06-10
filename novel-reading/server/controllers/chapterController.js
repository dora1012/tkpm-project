const { crawlChapter } = require('../services/crawlChapterPage')
const { CrawChapterPPT } = require('../services/crawlChapterByPuppeteer');

const { defaultSource } = require('../config/sources');


// used for Chapter Content Page
const getChapter = async (req, res) => {
    try {
      const { novelSlug, chapterSlug } = req.params;
      const url = `${defaultSource}/${novelSlug}/chuong-${chapterSlug}/`
      const chapter = await crawlChapter(url);
      res.json(chapter);  
    } catch (error) {  
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error - CHAPTER CONTENT CONTROLLER' });
    }
};

// used for Chapter Page
const getChapterList = async (req, res) => {
  try {
    const { novelSlug, chapterSlug } = req.params;
    const url = `${defaultSource}/${novelSlug}/${chapterSlug}/`
    const chapterList = await CrawChapterPPT(url);
    res.json(chapterList);  
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - CHAPTER LIST IN CONTROLLER' });
  }
};

module.exports = {
    getChapter,
    getChapterList
  };