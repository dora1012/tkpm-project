const Strategy = require('./crawlerStrategy');
const pagination = require('../utils/pagination');
const puppeteer = require('puppeteer');
const fetchPage = require('../utils/fetchPage');
const {processChapterTitles} = require('../utils/processChapter');
const cheerio = require('cheerio');

class TruyenFull extends Strategy {
    async extractData(url, type) {
        const data = await fetchPage(url);
        const $ = cheerio.load(data);
        switch (type) {
            case 'hot':
                return this.extractHot($);
            case 'new':
                return this.extractNew($);
            case 'finished':
                return this.extractFinished($);
            case 'main':
                return this.extractMain($);
            case 'category':
                return this.extractCategory($);
            case 'classification':
                return this.extractClassification($);
            case 'list':
                return this.extractList($);
            case 'chapter':
                return this.extractChapter($);
            case 'info':
                return this.extractInfo($);
            case 'chapter-pagination':
                return this.extractChapterPagination($);
            default:
                throw new Error('Invalid type');
        }
    }

    extractHot($) {
        let result = [];
        $('#intro-index .item').each((index, element) => {
            const title = $(element).find('.title h3').text().trim();
            const image = $(element).find('img').attr('src');

            result.push({ title, image });
        });
        return result;
    }

    extractNew($) {
        let result = [];
        $('.list.list-truyen.list-new .row').each((index, element) => {
            const title = $(element).find('.col-title h3 a').text().trim();
            const categories = $(element).find('.col-cat a').map((i, el) => $(el).text().trim()).get();
            const chapter = $(element).find('.col-chap a').text().trim();
            const updateTime = $(element).find('.col-time').text().trim();

            result.push({ title, categories, chapter, updateTime });
        });
        return result;
    }

    extractFinished($) {
        let result = [];
        $('#truyen-slide .list-thumbnail .row .col-xs-4').each((index, element) => {
            const title = $(element).find('a').attr('title').trim();
            const image = $(element).find('.lazyimg').attr('data-image');
            const caption = $(element).find('.caption small').text().trim();

            result.push({ title, image, caption });
        });
        return result;
    }

    extractMain($) {
        let result = [];
        $('.control.nav.navbar-nav .dropdown').first().find('.dropdown-menu li a').each((index, element) => {
            const title = $(element).text().trim();
            result.push(title);
        });
        return result;
    }

    extractCategory($) {
        let result = [];
        $('.control.nav.navbar-nav .dropdown').eq(1).find('.dropdown-menu li a').each((index, element) => {
            const title = $(element).text().trim();
            result.push(title);
        });
        return result;
    }

    extractClassification($) {
        let result = [];
        $('.control.nav.navbar-nav .dropdown').eq(2).find('.dropdown-menu li a').each((index, element) => {
            const title = $(element).text().trim();
            result.push(title);
        });
        return result;
    }

    extractList($) {
        const result = [];

        $('.list .row[itemscope]').each((index, element) => {
            const novel = {};

            novel.image = $(element).find('div[data-image]').attr('data-image') || '';
            novel.title = $(element).find('h3.truyen-title a').text().trim();
            novel.authors = $(element).find('.author').text().trim().split(',').map(author => author.trim());
            novel.chapter = $(element).find('.text-info a').text().trim();

            result.push(novel);
        });
        return result;
    }

    extractChapter($) {
        const result = {};

        result.novelTitle = $('a.truyen-title').text().trim();
        result.chapterTitle = $('a.chapter-title').text().trim();
        result.chapterContent = $('#chapter-c').html().trim();

        result.chapterList = [];
        $('#chapter-nav-top .chapter_jump option').each((i, el) => {
            const chapterNumber = $(el).text();
            const chapterLink = $(el).attr('value'); // Assuming the value attribute contains the link
            result.chapterList.push({ chapterNumber, chapterLink });
        });

        return result;
    }

    extractInfo($) {
        const result = {};

        result.title = $('h3.title').text().trim();
        result.image = $('.book img').attr('src');
        result.authors = [];
        $('a[itemprop="author"]').each((index, element) => {
            result.authors.push($(element).text().trim());
        });

        result.categories = [];
        $('a[itemprop="genre"]').each((index, element) => {
            result.categories.push($(element).text().trim());
        });

        result.status = $('div.info h3:contains("Trạng thái:")')
            .next('span').text().trim();

        result.description = $('.desc-text.desc-text-full').html();

        result.rating = {
            score: $('span[itemprop="ratingValue"]').text().trim(),
            best: $('span[itemprop="bestRating"]').text().trim(),
            count: $('span[itemprop="ratingCount"]').text().trim(),
        };

        result.chapterList = [];

        $('#list-chapter ul.list-chapter li a').each((index, element) => {
            result.chapterList.push($(element).text().trim());
        });
        return result;
    };

    extractChapterPagination($) {
        const result = {};
        result.chapterList = [];

        $('#list-chapter ul.list-chapter li a').each((index, element) => {
            result.chapterList.push($(element).text().trim());
        });

        return result;
    }

    async extractDataWithAysncHandles(url, type) {
        switch (type) {
            case 'max-pagination':
                return await pagination.getMaxPaginationNumber(url);
            case 'chapter-ppt':
                return await this.extractChapterPPT(url);
            case 'all-chapters':
                return await this.extractAllChapters(url);
            case 'max-chapter':
                return await this.extractMaxChapterNumber(url);
            default:
                throw new Error('Invalid type');
        }
    }

    async extractChapterPPT(url) {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        await page.click('.chapter_jump');
        await page.waitForSelector('.chapter_jump option', { timeout: 10000 });

        const detailTruyen = await page.evaluate(() => {
            let chapterList = Array.from(document.querySelectorAll('.chapter_jump option'))
                .map(option => option.innerText.match(/\d+/)[0]);
            let halfLength = Math.floor(chapterList.length / 2);
            chapterList = chapterList.slice(halfLength)

            return {
                chapterList
            };
        });

        await browser.close();
        return detailTruyen;
    }

    async extractAllChapters(novelUrl) {
        let chapterList = [];
        let currentPage = 1;
        let hasNextPage = true;

        while (hasNextPage) {
            var url = `${novelUrl}trang-${currentPage}/#list-chapter`;
            console.log(`Fetching chapter list from ${url}`);

            let htmlData = await fetchPage(url);
            let $ = cheerio.load(htmlData);

            $('#list-chapter ul.list-chapter li a').each((index, element) => {
                chapterList.push($(element).text().trim());
            });

            const nextPageLink = $('a span.glyphicon-menu-right').closest('a').attr('href');
            hasNextPage = nextPageLink ? true : false;
            currentPage++;
        }
        return chapterList;
    }
    async extractMaxChapterNumber(url) {
  let chapterList = [];
  let maxPage = await pagination.getMaxPaginationNumber(url);
  let novelUrl = `${url}trang-${maxPage}/`;
  let htmlData = await fetchPage(novelUrl);
  let $ = cheerio.load(htmlData);
  $('#list-chapter ul.list-chapter li a').each((index, element) => {
    chapterList.push($(element).text().trim());
  });

  let lastChapter = chapterList[chapterList.length - 1];
  let lastChapterList = [lastChapter];
  lastChapterList = await processChapterTitles(lastChapterList);
  return lastChapterList[0];
}

}

module.exports = TruyenFull;