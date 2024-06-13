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
        let content = $('.box-chap').html().trim();
		// Thêm dấu xuống dòng sau mỗi thẻ </p> và <br>
        content = content.replace(/<\/p>/g, '</p>\n').replace(/<br\s*\/?>/g, '<br>\n');

        // Xóa các thẻ HTML nhưng giữ lại dấu xuống dòng
        content = content.replace(/<\/?[^>]+(>|$)/g, "");

        // Thêm dấu xuống dòng sau mỗi dấu chấm câu (dấu chấm, dấu hỏi, dấu chấm than)
        content = content.replace(/([.!?])\s*(?=[A-ZÀ-Ỳ])/g, ".<br>\n<br>\n")
		result.chapterContent = content;
        return result;
    }
}


module.exports = TangThuVien;

