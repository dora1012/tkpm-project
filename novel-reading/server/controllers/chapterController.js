//const { CrawChapterPPT } = require('../services/crawlChapterByPuppeteer');
// const { crawlChapter } = require('../services/crawlChapterPage')
//const { defaultSource } = require('../config/sources');
let sources = require('../config/sources');
const defaultSource = sources.defaultSource;
const Crawler = require('../services/crawler');
//const TruyenFull = require('../services/crawlerTruyenFull');
const chokidar = require('chokidar');
const path = require('path');

const sourcesPath = path.join(__dirname, '../config/sources.js');
const watcher = chokidar.watch(sourcesPath, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});

watcher.on('change', function (path) {
  console.log(`File ${path} has been changed`);
  delete require.cache[require.resolve('../config/sources.js')];
  sources = require('../config/sources.js');
});

let crawler = new Crawler(sources.server1.crawler);

// used for Chapter Content Page
const getChapter = async (req, res) => {
    try {
      const { novelSlug, chapterSlug, source } = req.params;
      if (source) {
        console.log(sources[source]);
        crawler.setStrategy(sources[source].crawler);
      }
      const url = `${sources[source].url}/${novelSlug}/chuong-${chapterSlug}/`
      const chapter = await crawler.crawl(url, 'chapter');
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
    // const chapterList = await CrawChapterPPT(url);
    const chapterList = await crawler.crawlWithAsyncHandles(url, 'chapter-ppt');
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