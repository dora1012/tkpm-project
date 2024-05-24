const puppeteer = require('puppeteer');

async function novelContent(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Lấy thông tin chi tiết của chương
    const detailTruyen = await page.evaluate(() => {
        const prevChapter = document.querySelector('#prev_chap').href;
        const nextChapter = document.querySelector('#next_chap').href;
        const chapterInfoLink = document.querySelector('.chapter-title').href;
        const chapterTitle = document.querySelector('.chapter-title').innerText;
        const truyenTitle = document.querySelector('.truyen-title').href;
        const chapterJump = document.querySelector('.chapter_jump').innerText;
        const contentParagraphs = document.querySelectorAll('.chapter-c p');
        
        const content = Array.from(contentParagraphs).map(p => p.innerText).join('\n');

        // Lưu tất cả thông tin vào biến detailTruyen
        return {
            prevChapter,
            nextChapter,
            chapterInfoLink,
            chapterTitle,
            truyenTitle,
            chapterJump,
            content
        };
    });

    await browser.close();
    return detailTruyen;
}


module.exports = novelContent;
// Ví dụ sử dụng
// (async () => {
//     const url = 'https://truyenfull.vn/tu-cam-270192/chuong-2/';
//     const detailTruyen = await novelContent(url);
//     console.log(detailTruyen);
// })();
