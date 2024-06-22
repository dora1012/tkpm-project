const puppeteer = require('puppeteer');
const Strategy = require('./crawlerStrategy');

class SSTruyen extends Strategy {
    async extractData(url, type) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        let result;
        switch (type) {
            case 'chapter':
                result = await this.extractChapter(page);
                break;
            default:
                throw new Error('Invalid type');
        }

        await browser.close();
        return result;
    }

    async extractChapter(page) {
        const result = {};

        // Extract the novel title
        result.novelTitle = await page.evaluate(() => {
            return document.querySelector('.rv-full-story-title h1').innerText.trim();
        });

        // Extract the chapter title
        // result.chapterTitle =  await page.evaluate(() => {
        //     return document.querySelector('h2.rv-chapt-title a')?.innerText.trim();
        // });
        // Extract the chapter content
        let content = await page.evaluate(() => {
            return document.querySelector('.content_wrap1 .content.container1').innerHTML.trim();
        });

        // Thêm dấu xuống dòng sau mỗi thẻ </p> và <br>
        content = content.replace(/<\/p>/g, '</p>\n').replace(/<br\s*\/?>/g, '<br>\n');

        // Xóa các thẻ HTML nhưng giữ lại dấu xuống dòng
        content = content.replace(/<\/?[^>]+(>|$)/g, "");

        // Thêm dấu xuống dòng sau mỗi dấu chấm câu (dấu chấm, dấu hỏi, dấu chấm than)
        content = content.replace(/([.!?])\s*(?=[A-ZÀ-Ỳ])/g, ".<br>\n<br>\n");

        
        let chapterTitle = undefined;
        const titleMatch = content.match(/(Chương.*?:.*?)\n/);
        if (titleMatch) {
            chapterTitle = titleMatch[1];
            // Remove the chapter title from the chapter content
            content = content.replace(titleMatch[0], '');
        }
        result.chapterContent = content;
        result.chapterTitle = chapterTitle;
        return result;
    }
}

module.exports = SSTruyen;


(async () => {
    const crawler = new SSTruyen();
    const url = 'https://sstruyen.vn/ngao-the-dan-than/chuong-2/';
    try {
        const data = await crawler.extractData(url, 'chapter');
        console.log('Novel Title:', data.novelTitle);
        console.log('Chapter Title:', data.chapterTitle);
        console.log('Chapter Content:', data.chapterContent);
    } catch (error) {
        console.error(error);
    }
})();