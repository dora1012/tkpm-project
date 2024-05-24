const puppeteer = require('puppeteer');
const { slugify } = require('../utils/slugify');


async function novelInfor(source, title) {
    const url = `${source}/${slugify(title)}`;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Lấy thông tin chi tiết của truyện
    const infor = await page.evaluate(() => {
        const title = document.querySelector('h3.title[itemprop="name"]').innerText;
        const image = document.querySelector('.books .book img[itemprop="image"]').src;
        const authors = Array.from(document.querySelectorAll('.info a[itemprop="author"]')).map(author => author.innerText);
        const genres = Array.from(document.querySelectorAll('.info a[itemprop="genre"]')).map(genre => genre.innerText);
        const status = document.querySelector('.info .text-success').innerText;
        const description = document.querySelector('.desc-text.desc-text-full[itemprop="description"]').innerText;
        const rating = document.querySelector('.rate .small em span[itemprop="ratingValue"]').innerText;
        // Lấy danh sách chương
        const chapterList = Array.from(document.querySelectorAll('#list-chapter .list-chapter li a')).map(chapter => ({
            title: chapter.innerText,
            link: chapter.href
        }));

        // Lưu tất cả thông tin vào biến infor
        return {
            title,
            image,
            authors,
            genres,
            status,
            description,
            rating,
            chapters: chapterList
        };
    });

    await browser.close();
    return infor;
}

// Export the function for external use
module.exports = {
    novelInfor
};

// Example controller usage
(async () => {
    const source = 'https://truyenfull.vn';
    const title = 'Tự cẩm';
    try {
        const infor = await novelInfor(source, title);
        console.log(infor);
        // You can now use infor in your controller
    } catch (error) {
        console.error('Error fetching novel content:', error);
    }
})();



