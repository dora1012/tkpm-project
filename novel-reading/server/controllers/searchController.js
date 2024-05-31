const { crawlSearchResults } = require('../services/crawlSearchPage'); 
const { crawlNovelList } = require('../services/crawlListPage');
const { defaultSource } = require('../config/sources');
const { encodeKeyword } = require('../utils/encodeKeyword');

const getNovelListOfSearchResult = async (req, res) => {
  var keyword = req.query.tukhoa;
  keyword = encodeKeyword(keyword);
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }
  
  try {
    const searchUrl = `${defaultSource}/tim-kiem/?tukhoa=${keyword}`
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



