
const { crawlSearchResults } = require('../services/crawlSearchPage'); 
const {crawlNovelList } = require('../services/crawlListPage');
const { defaultSource } = require('../config/sources');

const searchUrl= `${defaultSource}/tim-kiem/`;



const getNovelListOfSearchResult = async (req, res) => {
  const keyword = req.query;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    searchUrl=`${searchUrl}?tukhoa=${keyword}`
    const searchResults = await crawlNovelList(searchUrl);
    res.json(searchResults);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
};


module.exports = {
  getNovelListOfSearchResult
};



