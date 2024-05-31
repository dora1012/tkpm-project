const { crawlNovelList } = require('../services/crawlListPage');
const { defaultSource } = require('../config/sources');

// used for Novel List of A Author
const getNovelListOfAuthor = async (req, res) => {
  try {
    const { authorSlug } = req.params;
    const authorUrl = `${defaultSource}/tac-gia/${authorSlug}/`
    const novels = await crawlNovelList(authorUrl);
    res.json(novels);  
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL LIST OF AUTHOR CONTROLLER' });
  }
};

module.exports = {
    getNovelListOfAuthor
};
