const axios = require('axios');
const cheerio = require('cheerio');
const fetchPage = require('./fetchPage');
const {crawlMaxPaginationByNextPage} = require('../services/crawlListPage');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getLastPageLink = (paginationHtml) => {
  const $ = cheerio.load(paginationHtml);
  const lastPageLink = $('ul.pagination li:contains("Cuối") a').attr('href');
  console.log(`Last page link found: ${lastPageLink}`);
  return lastPageLink;
};

const getCurrentPageNumber = (paginationHtml) => {
  const $ = cheerio.load(paginationHtml);
  const currentPageNumber = parseInt($('ul.pagination li.active span').first().text(), 10);
  return currentPageNumber;
};

const fetchAndParse = async (url, parser) => {
  const html = await fetchPage(url);
  if (!html) {
    throw new Error(`Failed to fetch page: ${url}`);
  }
  return parser(html);
};

const getMaxPaginationNumber = async (url) => {
  try {
    const lastPageLink = await fetchAndParse(url, getLastPageLink);
    let lastPageNumber;
    if (lastPageLink) {
      await delay(1000);
      lastPageNumber = await fetchAndParse(lastPageLink, getCurrentPageNumber);
    } else {
      lastPageNumber=crawlMaxPaginationByNext(url);
    }
    console.log('Số trang cuối cùng là:', lastPageNumber);
    return lastPageNumber;
  } catch (error) {
    console.error(`Error fetching List Max: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getMaxPaginationNumber
};

// TEST
// (async () => {
//   const source = 'https://truyenfull.vn/diep-vo-khuyet-truyen-ky/';
//   try {
//     const maxNumber = await getMaxPaginationNumber(source);
//     console.log(maxNumber);
//   } catch (error) {
//     console.error('Error fetching novel list:', error.message);
//   }
// })();
