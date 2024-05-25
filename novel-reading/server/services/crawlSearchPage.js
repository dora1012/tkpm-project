const axios = require('axios');
const cheerio = require('cheerio');

const crawlSearchResults = async (searchUrl, queryParams) => {
  try {
    // Construct the search URL with query parameters
    const encodedKeyword = encodeURIComponent(queryParams.keyword).replace(/%20/g, '+');
    const url = `${searchUrl}?tukhoa=${encodedKeyword}`;
    console.log(`Fetching URL: ${url}`);  

    // Fetch the search page
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const searchResults = [];

    // Loop through each result item and extract the data
    $('.list .row[itemscope]').each((index, element) => {
      const result = {};

      result.image = $(element).find('div[data-image]').attr('data-image') || '';
      result.title = $(element).find('h3.truyen-title a').text().trim();
      result.url = $(element).find('h3.truyen-title a').attr('href');
      result.authors = $(element).find('.author').text().trim().split(',').map(author => author.trim());
      result.chapter = $(element).find('.text-info a').text().trim();

      searchResults.push(result);
    });

    return searchResults;
  } catch (error) {
    console.error(`Error fetching search results: ${error.message}`);
    if (error.response) {
      console.error(`Status: ${error.response.status}, Data: ${error.response.data}`);
    }
    throw new Error('Failed to fetch search results');
  }
};

module.exports = {
  crawlSearchResults,
};

// TEST
(async () => {
  const searchUrl = 'https://truyenfull.vn/tim-kiem';
  const queryParams = {
    keyword: ' lâm  '  
  };

  try {
    const searchResults = await crawlSearchResults(searchUrl, queryParams);
    console.log(searchResults);
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
})();


