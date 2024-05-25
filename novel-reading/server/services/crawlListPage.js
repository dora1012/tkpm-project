const axios = require('axios');
const cheerio = require('cheerio');

const crawlNovelList = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const novelList = [];

    $('.list .row[itemscope]').each((index, element) => {
      const novel = {};

      novel.image = $(element).find('div[data-image]').attr('data-image') || '';
      novel.title = $(element).find('h3.truyen-title a').text().trim();
      novel.url = $(element).find('h3.truyen-title a').attr('href');
      novel.authors = $(element).find('.author').text().trim().split(',').map(author => author.trim());
      novel.chapter = $(element).find('.text-info a').text().trim();

      novelList.push(novel);
    });

    return novelList;
  } catch (error) {
    console.error(`Error fetching novel list: ${error}`);
    throw new Error('Failed to fetch novel list');
  }
};

module.exports = {
  crawlNovelList,
};

// TEST
(async () => {
  const source = 'https://truyenfull.vn/danh-sach/kiem-hiep-hay/';
  try {
    const novelList = await crawlNovelList(source);
    console.log(novelList);
  } catch (error) {
    console.error('Error fetching novel list:', error);
  }
})();


