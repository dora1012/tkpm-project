const axios = require('axios');
const cheerio = require('cheerio');

const crawlChapter = async (chapterurl) => {
  try {
    const response = await axios.get(chapterurl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const chapter = {};

    // Extracting novel title
    chapter.novelTitle = $('a.truyen-title').text().trim();

    // Extracting chapter title
    chapter.chapterTitle = $('a.chapter-title').text().trim();

    // Extracting chapter content
    chapter.chapterContent = $('#chapter-c').html().trim();

    // // Extracting chapter list from dropdown button
    // chapter.chapterList = [];
    // $('.chapter_jump option').each((index, element) => {
    //   const chapterNumber = $(element).text().match(/\d+/);
    //   if (chapterNumber) {
    //     chapter.chapterList.push(chapterNumber[0]);
    //   }
    // });
    chapter.chapterList = [];
        $('#chapter-nav-top .chapter_jump option').each((i, el) => {
            const chapterNumber = $(el).text();
            const chapterLink = $(el).attr('value'); // Assuming the value attribute contains the link
            chapter.chapterList.push({ chapterNumber, chapterLink });
        });

    return chapter;
  } catch (error) {
    console.error(`Error fetching novel content: ${error}`);
    throw new Error('Failed to fetch novel content');
  }
};

module.exports = {
  crawlChapter,
};

// TEST
(async () => {
  const source = 'https://truyenfull.vn/bia-do-dan-phan-cong/chuong-2';
  try {
    const infor = await crawlChapter(source);
    console.log(infor);
  } catch (error) {
    console.error('Error fetching chapter:', error);
  }
})();


