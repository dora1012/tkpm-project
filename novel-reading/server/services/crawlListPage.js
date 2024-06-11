const axios = require('axios');
const cheerio = require('cheerio');
const fetchPage = require('../utils/fetchPage');
const { getMaxPaginationNumber} = require('../utils/pagination');


const crawlNovelList = async (url) => {
  try {
    const html= await fetchPage(url);

    const $ = cheerio.load(html);
    const novelList = [];

    $('.list .row[itemscope]').each((index, element) => {
      const novel = {};

      novel.image = $(element).find('div[data-image]').attr('data-image') || '';
      novel.title = $(element).find('h3.truyen-title a').text().trim();
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

const crawlMaxPaginationNumber = async (url) => {
try{
    const maxNumber = await getMaxPaginationNumber(url);
    return maxNumber;
}
catch (error) {
    console.error(`Error fetching max pagination num: ${error}`);
    throw new Error('Failed to fetch max pagination num');
  }
}



module.exports = {
  crawlNovelList,
  crawlMaxPaginationNumber
};

// TEST
// (async () => {
//   const source = 'https://truyenfull.vn/the-loai/dam-my/';
//   try {
//     const novelList = await crawlNovelList(source);
//     console.log(novelList);
//   } catch (error) {
//     console.error('Error fetching novel list:', error.message);
//   }
// })();


