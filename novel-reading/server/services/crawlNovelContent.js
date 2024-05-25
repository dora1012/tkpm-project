const axios = require('axios');
const cheerio = require('cheerio');

const crawlNovelContent = async (chapterurl) => {
  try {
    const response = await axios.get(chapterurl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const novelContent = {};

    // Extracting novel title
    novelContent.novelTitle = $('a.truyen-title').text().trim();

    // Extracting chapter title
    novelContent.chapterTitle = $('a.chapter-title').text().trim();

    // Extracting chapter content
    novelContent.chapterContent = $('#chapter-c').html().trim();

    // Extracting chapter list from dropdown button
    novelContent.chapterList = [];
    $('.chapter_jump option').each((index, element) => {
      const chapterNumber = $(element).text().match(/\d+/);
      if (chapterNumber) {
        novelContent.chapterList.push(chapterNumber[0]);
      }
    });

    return novelContent;
  } catch (error) {
    console.error(`Error fetching novel content: ${error}`);
    throw new Error('Failed to fetch novel content');
  }
};

module.exports = {
  crawlNovelContent,
};

// Example controller usage
(async () => {
  const source = 'https://truyenfull.vn/bia-do-dan-phan-cong/chuong-2';
  try {
    const infor = await crawlNovelContent(source);
    console.log(infor);
    // You can now use infor in your controller
  } catch (error) {
    console.error('Error fetching novel content:', error);
  }
})();


