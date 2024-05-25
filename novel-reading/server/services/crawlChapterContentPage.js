const axios = require('axios');
const cheerio = require('cheerio');

const crawlChapterContent = async (chapterurl) => {
  try {
    const response = await axios.get(chapterurl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const chapterContent = {};

    // Extracting novel title
    chapterContent.novelTitle = $('a.truyen-title').text().trim();

    // Extracting chapter title
    chapterContent.chapterTitle = $('a.chapter-title').text().trim();

    // Extracting chapter content
    chapterContent.chapterContent = $('#chapter-c').html().trim();

    // Extracting chapter list from dropdown button
    chapterContent.chapterList = [];
    $('.chapter_jump option').each((index, element) => {
      const chapterNumber = $(element).text().match(/\d+/);
      if (chapterNumber) {
        chapterContent.chapterList.push(chapterNumber[0]);
      }
    });

    return chapterContent;
  } catch (error) {
    console.error(`Error fetching novel content: ${error}`);
    throw new Error('Failed to fetch novel content');
  }
};

module.exports = {
  crawlChapterContent,
};

// TEST
// (async () => {
//   const source = 'https://truyenfull.vn/bia-do-dan-phan-cong/chuong-2';
//   try {
//     const infor = await crawlChapterContent(source);
//     console.log(infor);
//   } catch (error) {
//     console.error('Error fetching novel content:', error);
//   }
// })();

