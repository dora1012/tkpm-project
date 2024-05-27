const puppeteer = require('puppeteer');
const { slugify } = require('../utils/slugify');

async function CrawChapterPPT(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.click('.chapter_jump');
    await page.waitForSelector('.chapter_jump option');
    
    // Lấy thông tin chi tiết của chương
    const detailTruyen = await page.evaluate(() => {
        const chapterList = Array.from(document.querySelectorAll('.chapter_jump option'))
            .map(option => option.innerText.match(/\d+/)[0]);
        
        const selectedChapterOption = document.querySelector('.chapter_jump option:checked');
        const currentChapter = selectedChapterOption ? selectedChapterOption.value.match(/\d+/)[0] : null;
        const chapterTitle = document.querySelector('.chapter-title').innerText;
        const novelTitle = document.querySelector('.truyen-title').innerText;
        //const chapterJump = document.querySelector('.chapter_jump').innerText;
        const contentParagraphs = document.querySelectorAll('.chapter-c p');
        
        const content = Array.from(contentParagraphs).map(p => p.innerText).join('\n');

        // Lưu tất cả thông tin vào biến detailTruyen
        return {
            chapterList,
            currentChapter,
            chapterTitle,
            novelTitle,
            //chapterJump,
            content
        };
    });

    await browser.close();
    return detailTruyen;
}

module.exports = CrawChapterPPT;

// Ví dụ sử dụng
(async () => {
    const source = 'https://truyenfull.vn/bia-do-dan-phan-cong/chuong-2';
    try {
      const infor = await CrawChapterPPT(source);
      console.log(infor);
    } catch (error) {
      console.error('Error fetching novel content:', error);
    }
  })();
