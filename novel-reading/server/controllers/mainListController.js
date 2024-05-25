const {crawlMainList } = require('../services/crawlHomePage');
const {crawlNovelList } = require('../services/crawlListPage');
const { defaultSource } = require('../config/sources');


// used for Home Page
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
const getNovelMainList= async (req, res) => {
  try {
    const{slug, listSlug } =req.params;
    const url= `${defaultSource}/${slug}/${listSlug}/`
    const novels = await crawlNovelList(url);
    res.json(novels);  
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL MAIN LIST CONTROLLER' });
  }
};




module.exports = {
    getMainList,
    getNovelMainList
};
