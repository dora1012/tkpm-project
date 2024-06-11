const axios = require('axios');
const cheerio = require('cheerio');
const fetchPage = require('../utils/fetchPage');
const { getMaxPaginationNumber } = require('../utils/pagination');




const crawlNovelInfo = async (novelUrl) => {
  try {
    const htmlData= await fetchPage(novelUrl);

    const $ = cheerio.load(htmlData);
    const novelInfor = {};

    // Extracting title
    novelInfor.title = $('h3.title').text().trim();

    // Extracting image URL
    novelInfor.image = $('.book img').attr('src');

    // Extracting authors
    novelInfor.authors = [];
    $('a[itemprop="author"]').each((index, element) => {
      novelInfor.authors.push($(element).text().trim());
    });

    // Extracting categories
    novelInfor.categories = [];
    $('a[itemprop="genre"]').each((index, element) => {
      novelInfor.categories.push($(element).text().trim());
    });

    // Extracting status
    novelInfor.status = $('div.info h3:contains("Trạng thái:")')
      .next('span').text().trim();

    // Extracting description
    novelInfor.description = $('div.desc-text[itemprop="description"]').text().trim();

    // Extracting rating
    novelInfor.rating = {
      score: $('span[itemprop="ratingValue"]').text().trim(),
      best: $('span[itemprop="bestRating"]').text().trim(),
      count: $('span[itemprop="ratingCount"]').text().trim(),
    };

    // Extracting chapter list
    novelInfor.chapterList = [];
  
    $('#list-chapter ul.list-chapter li a').each((index, element) => {
        novelInfor.chapterList.push($(element).text().trim());
    });
    
    // get max pagination number
    novelInfor.maxPagination = await getMaxPaginationNumber(novelUrl);

    return novelInfor;
  } catch (error) {
    console.error(`Error fetching novel info: ${error}`);
    throw new Error('Failed to fetch novel information');
  }
};



const crawlChapterPagination = async (novelUrl) => {
  try {
    const htmlData= await fetchPage(novelUrl);

    const $ = cheerio.load(htmlData);
    const novelInfor = {};
    // Extracting chapter list
    novelInfor.chapterList = [];
  
    $('#list-chapter ul.list-chapter li a').each((index, element) => {
        novelInfor.chapterList.push($(element).text().trim());
    });

    return novelInfor;
  } catch (error) {
    console.error(`Error fetching novel info: ${error}`);
    throw new Error('Failed to fetch novel information');
  }
};






const crawlAllChapters = async (novelUrl) => {
  try {
    let chapterList = [];
    let currentPage = 1;
    let hasNextPage= true;

    while (hasNextPage  ) {
      var url = `${novelUrl}trang-${currentPage}/#list-chapter`;
      console.log(`Fetching chapter list from ${url}`);
      
      // Watch and change how to get response
      let htmlData = await fetchPage(url);
      let $ = cheerio.load(htmlData);

      $('#list-chapter ul.list-chapter li a').each((index, element) => {
        chapterList.push($(element).text().trim());
      });
      


      // Kiểm tra xem có trang tiếp theo không
      const nextPageLink = $('a span.glyphicon-menu-right').closest('a').attr('href');
      hasNextPage = nextPageLink ? true : false;
      // Tăng số trang hiện tại
      currentPage++;
    }

    return chapterList;
    
  } catch (error) {
    console.error(`Error fetching chapter list: ${error}`);
    throw new Error('Failed to fetch chapter list');
  }
};



  
  
module.exports = {
  crawlNovelInfo,
  crawlChapterPagination,
  crawlAllChapters,

};


// TEST
// (async () => {
//     const source = 'https://truyenfull.vn/bia-do-dan-phan-cong/trang-4/#list-chapter';
//     try {
//         const infor = await crawlNovelInfo(source);
//         console.log(infor);
//     } catch (error) {
//         console.error('Error fetching novel content:', error);
//     }
// })();
