const puppeteer = require('puppeteer');
const { slugify } = require('../utils/slugify');

async function CrawChapterContentPPT(source, title, chapter) {
    const url = `${source}/${slugify(title)}/chuong-${chapter}/`;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.click('.chapter_jump');
    await page.waitForSelector('.chapter_jump option');
    
    // Lấy thông tin chi tiết của chương
    const detailTruyen = await page.evaluate(() => {
        const chapterList = Array.from(document.querySelectorAll('.chapter_jump option'))
            .map(option => option.innerText.match(/\d+/)[0]);
        const chapterInfoLink = document.querySelector('.chapter-title').href;
        const chapterTitle = document.querySelector('.chapter-title').innerText;
        const novelTitle = document.querySelector('.truyen-title').href;
        //const chapterJump = document.querySelector('.chapter_jump').innerText;
        const contentParagraphs = document.querySelectorAll('.chapter-c p');
        
        const content = Array.from(contentParagraphs).map(p => p.innerText).join('\n');

        // Lưu tất cả thông tin vào biến detailTruyen
        return {
            chapterList,
            chapterInfoLink,
            chapterTitle,
            novelTitle,
            //chapterJump,
            content
        };
    });

    await browser.close();
    return detailTruyen;
}

module.exports = CrawChapterContentPPT;

// Ví dụ sử dụng
(async () => {
    const source = 'https://truyenfull.vn';
    const title = 'Tự cẩm';
    const chapter = 2;
    try {
        console.log(`${source}/${slugify(title)}/chuong-${chapter}/`);
        const detailTruyen = await CrawChapterContentPPT(source, title, chapter); // Correctly calling and awaiting the function
        console.log(detailTruyen); // Logging the result after it is defined
    } catch (error) {
        console.error('Error fetching novel content:', error);
    }
})();
