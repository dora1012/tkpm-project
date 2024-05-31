const { crawlMainList } = require('../services/crawlHomePage');
const { crawlNovelList } = require('../services/crawlListPage');
const { defaultSource } = require('../config/sources');

// used for Navigation Bar 
const getMainList = async (req, res) => {
  try {
    const mainList = await crawlMainList(defaultSource);
    res.json(mainList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - MAIN LIST' });
  }
};

// used for Novel List of Each Type in MainList
const getNovelListOfMainList = async (req, res) => {
  try {
    const { listSlug } = req.params;
    const listUrl = `${defaultSource}/danh-sach/${listSlug}/`;
    const novels = await crawlNovelList(listUrl);
    res.json(novels);
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL MAIN LIST CONTROLLER' });
  }
};

module.exports = {
  getMainList,
  getNovelListOfMainList
};
