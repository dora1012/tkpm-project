const axios = require('axios');
const cheerio = require('cheerio');
const fetchPage = require('./fetchPage');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getLastPageLink = (paginationHtml) => {
  const $ = cheerio.load(paginationHtml);
  const lastPageLink = $('ul.pagination li:contains("Cuối") a').attr('href');
  //console.log(`Last page link found: ${lastPageLink}`);
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


const getMaxPaginationByNext = async (novelUrl) => {
  try {
    let currentPage = 1;
    let hasNextPage= true;

    while (hasNextPage  ) {
      var url = `${novelUrl}trang-${currentPage}/`;
      console.log(`Fetching from ${url}`);
      // get html data
      let htmlData = await fetchPage(url);
      let $ = cheerio.load(htmlData);
      // Kiểm tra xem có trang tiếp theo không
      const nextPageLink = $('a span.glyphicon-menu-right').closest('a').attr('href');
      hasNextPage = nextPageLink ? true : false;
      // Tăng số trang hiện tại
      currentPage++;
    }

    return currentPage-1;
    
  } catch (error) {
    console.error(`Error fetching max pagination number by next: ${error}`);
    throw new Error('Failed to fetch max pagination number by next');
  }
};

const getMaxPaginationNumber = async (url) => {
  try {
    const lastPageLink = await fetchAndParse(url, getLastPageLink);
    let lastPageNumber=1;
    if (lastPageLink) {
      await delay(1000);
      lastPageNumber = await fetchAndParse(lastPageLink, getCurrentPageNumber);
    } else {
      lastPageNumber= await getMaxPaginationByNext(url);
    }
    //console.log('Max Page:', lastPageNumber);
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
