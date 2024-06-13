const Strategy = require('./crawlerStrategy');
const cheerio = require('cheerio');
const fetchPage = require('../utils/fetchPage');

class TangThuVien extends Strategy {
    async extractData(url, type) {
        const data = await fetchPage(url);
        const $ = cheerio.load(data);
        switch (type) {
            case 'chapter':
                return this.extractChapter($);
            default:
                throw new Error('Invalid type');
        }
    }

    extractChapter($) {
        const result = {};

        // Extract the novel title
        result.novelTitle = $('h1.truyen-title a').text().trim();
        
        // Extract the chapter title
        result.chapterTitle = $('h2').text().trim();
        
        // Extract the chapter content
        result.chapterContent = $('.box-chap').text().trim();
        
        return result;
    }
}

module.exports = TangThuVien;
