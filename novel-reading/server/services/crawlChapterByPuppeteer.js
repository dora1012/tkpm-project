const puppeteer = require('puppeteer');
const { slugify } = require('../utils/slugify');

const CrawChapterPPT = async (url) => {
    try {
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
        chapterList = chapterList.slice(halfLength);

        //const selectedChapterOption = document.querySelector('.chapter_jump option:checked');
        //const currentChapter = selectedChapterOption ? selectedChapterOption.value.match(/\d+/)[0] : null;
        //const chapterTitle = document.querySelector('.chapter-title').innerText;
        //const novelTitle = document.querySelector('.truyen-title').innerText;
        //const contentParagraphs = document.querySelectorAll('.chapter-c p');

        //const content = Array.from(contentParagraphs).map(p => p.innerText).join('\n');

        return {
            chapterList
        };
    });

    await browser.close();
    return detailTruyen;
} catch (error) {
    console.error(`Error fetching novel content: ${error}`);
    throw new Error('Failed to fetch novel content');
  }
};

module.exports = {
    CrawChapterPPT,
  };

// Test
(async () => {
    const source = 'https://truyenfull.vn/bia-do-dan-phan-cong/chuong-2';
    try {
        const infor = await CrawChapterPPT(source);
        console.log(infor);
    } catch (error) {
        console.error('Error fetching novel content:', error);
    }
})();
