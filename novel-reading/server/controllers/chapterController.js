const {crawlChapterContent} = require('../services/crawlChapterContentPage')
const { defaultSource } = require('../config/sources');




// used for Chapter Content Page
const getChapterContent= async (req, res) => {
    try {
      const{novelSlug, chapterSlug } =req.params;
      const url= `${defaultSource}/${novelSlug}/${chapterSlug}/`
      const chapterContent = await crawlChapterContent(url);
      res.json(chapterContent);  
    } catch (error) {  
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error - CHAPTER CONTENT CONTROLLER' });
    }
};


module.exports = {
    getChapterContent
  };
