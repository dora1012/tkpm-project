const axios = require('axios');
const cheerio = require('cheerio');
const fetchPage = require('./fetchPage');
const {crawlMaxPaginationByNextPage} = require('../services/crawlListPage');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getLastPageLink =  (paginationHtml) => {
    const $ = cheerio.load(paginationHtml);
    const lastPageLink = $('ul.pagination li:contains("Cuối") a').attr('href');
    console.log(`Last page link found: ${lastPageLink}`);
    return lastPageLink;
};

const getCurrentPageNumber =  (paginationHtml) => {
    const $ = cheerio.load(paginationHtml);
    const currentPageNumber = parseInt($('ul.pagination li.active span').first().text(), 10);
    return currentPageNumber;
};

const getMaxPaginationNumber = async (url) => {
  try {
    const firstPageHtml = await fetchPage(url);
    if (firstPageHtml) {
      const lastPageLink = getLastPageLink(firstPageHtml);
      let lastPageNumber=1;
      if (lastPageLink) {
        await delay(1000); // Adding a delay of 1 second
        const lastPageHtml = await fetchPage(lastPageLink);
        lastPageNumber = getCurrentPageNumber(lastPageHtml);
      }
      else{
        lastPageNumber=crawlMaxPaginationByNext(url);
      }
      console.log('Số trang cuối cùng là:', lastPageNumber);
      return lastPageNumber;
    } else {
      console.log('Error fetching first page');
    }
  } catch (error) {
    console.error(`Error fetching List Max: ${error.message}`);
    throw new Error('Failed to fetch List Max');
  }
};

module.exports = {
  getCurrentPageNumber,
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
