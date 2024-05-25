const axios = require('axios');
const cheerio = require('cheerio');

const crawlNovelInfo = async (novelUrl) => {
  try {
    const response = await axios.get(novelUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
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

    return novelInfor;
  } catch (error) {
    console.error(`Error fetching novel info: ${error}`);
    throw new Error('Failed to fetch novel information');
  }
};

const crawlChapterList = async (novelUrl) => {
    try {
      const response = await axios.get(novelUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
  
      const $ = cheerio.load(response.data);
      const chapterList = [];
  
      $('#list-chapter ul.list-chapter li a').each((index, element) => {
        chapterList.push($(element).text().trim());
      });
  
      return chapterList;
    } catch (error) {
      console.error(`Error fetching chapter list: ${error}`);
      throw new Error('Failed to fetch chapter list');
    }
  };
  
  
  
module.exports = {
  crawlNovelInfo,
  crawlChapterList
};

// Example controller usage
(async () => {
    const source = 'https://truyenfull.vn/bia-do-dan-phan-cong/';
    try {
        const infor = await crawlChapterList(source);
        console.log(infor);
        // You can now use infor in your controller
    } catch (error) {
        console.error('Error fetching novel content:', error);
    }
})();
