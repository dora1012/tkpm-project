const axios = require('axios');
const cheerio = require('cheerio');



const crawlTruyenHot = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    let TruyenHot = [];

    $('#intro-index .item').each((index, element) => {
      const title = $(element).find('.title h3').text().trim();
      const image = $(element).find('img').attr('src');
      
      TruyenHot.push({ title, image });
    });

    return TruyenHot;  // Return the array of novels
  } catch (error) {
    console.error(`There was an error fetching the URL: ${error}`);
    throw new Error('Failed to fetch novels');
  }
};


const crawlTruyenMoiCapNhat = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
  
      const $ = cheerio.load(response.data);
      let truyenMoiCapNhat = [];
  
      $('.list.list-truyen.list-new .row').each((index, element) => {
        const title = $(element).find('.col-title h3 a').text().trim();
        const categories = $(element).find('.col-cat a').map((i, el) => $(el).text().trim()).get();
        const chapter = $(element).find('.col-chap a').text().trim();
        const updateTime = $(element).find('.col-time').text().trim();
        
        truyenMoiCapNhat.push({ title, categories, chapter, updateTime });
      });
  
      return truyenMoiCapNhat;  
    } catch (error) {
      console.error(`There was an error fetching the URL: ${error}`);
      throw new Error('Failed to fetch novels');
    }
  };

  const crawlTruyenDaHoanThanh = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
  
      const $ = cheerio.load(response.data);
      let truyenDaHoanThanh = [];
  
      $('#truyen-slide .list-thumbnail .row .col-xs-4').each((index, element) => {
        const title = $(element).find('a').attr('title').trim();
        const image = $(element).find('.lazyimg').attr('data-image');
        const caption = $(element).find('.caption small').text().trim();
  
        truyenDaHoanThanh.push({ title, image, caption });
      });
  
      return truyenDaHoanThanh;  // Return the array of novels
    } catch (error) {
      console.error(`There was an error fetching the URL: ${error}`);
      throw new Error('Failed to fetch novels');
    }
  };
  

  const crawlMainList = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
  
      const $ = cheerio.load(response.data);
      let mainList = [];
  
      // Select the first dropdown menu and extract its titles
      $('.control.nav.navbar-nav .dropdown').first().find('.dropdown-menu li a').each((index, element) => {
        const title = $(element).text().trim();
        mainList.push(title);
      });
  
      return mainList;  
    } catch (error) {
      console.error(`There was an error fetching the URL: ${error}`);
      throw new Error('Failed to fetch main list titles');
    }
  };
  

  const crawlCategoryList = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
  
      const $ = cheerio.load(response.data);
      let categoryList = [];
  
      // Select the second dropdown menu and extract its titles
      $('.control.nav.navbar-nav .dropdown').eq(1).find('.dropdown-menu li a').each((index, element) => {
        const title = $(element).text().trim();
        categoryList.push(title);
      });
  
      return categoryList;  
    } catch (error) {
      console.error(`There was an error fetching the URL: ${error}`);
      throw new Error('Failed to fetch category list titles');
    }
  };
  

  const crawlChapterClassificationList = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
  
      const $ = cheerio.load(response.data);
      let chapterClassificationList = [];
  
      // Select the third dropdown menu and extract its titles
      $('.control.nav.navbar-nav .dropdown').eq(2).find('.dropdown-menu li a').each((index, element) => {
        const title = $(element).text().trim();
        chapterClassificationList.push(title);
      });
  
      return chapterClassificationList;  // Return the array of titles
    } catch (error) {
      console.error(`There was an error fetching the URL: ${error}`);
      throw new Error('Failed to fetch chapter classification list titles');
    }
  };

  
module.exports = {
  crawlTruyenHot,
  crawlTruyenMoiCapNhat,
  crawlTruyenDaHoanThanh,
  crawlMainList,
  crawlCategoryList,
  crawlChapterClassificationList
};


// TEST
// (async () => {
//     const source = 'https://truyenfull.vn';
//     try {
//         const infor = await crawlChapterClassificationList(source);
//         console.log(infor);
//     } catch (error) {
//         console.error('Error fetching novel content:', error);
//     }
// })();