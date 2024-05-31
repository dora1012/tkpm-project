const { crawlChapter } = require('../services/crawlChapterPage')
const { defaultSource } = require('../config/sources');


// used for Chapter Content Page
const getChapter = async (req, res) => {
    try {
      const { novelSlug, chapterSlug } = req.params;
      const url = `${defaultSource}/${novelSlug}/${chapterSlug}/`
      const chapter = await crawlChapter(url);
      res.json(chapter);  
    } catch (error) {  
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error - CHAPTER CONTENT CONTROLLER' });
    }
};

module.exports = {
    getChapter
  };