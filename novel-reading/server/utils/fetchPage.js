const axios = require('axios');

const fetchPage = async (url) => {
  try {
    console.log(`Fetching page: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching page: ${error.message}`);
    throw new Error('Failed to fetch page');
  }
};

module.exports = fetchPage;
