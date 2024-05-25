// controllers/searchController.js

const { crawlSearchResults } = require('../services/crawlSearchPage'); 
const { sources } = require('../config/sources'); 
const searchUrl= sources.truyenfull.url

searchUrl=`${searchUrl}/tim-kiem`;


const searchController = async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    const searchResults = await crawlSearchResults(searchUrl, { keyword });
    res.json(searchResults);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
};

module.exports = {
  searchController,
};



