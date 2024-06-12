const Strategy = require('./crawlerStrategy');
const cheerio = require('cheerio');
const fetchPage = require('../utils/fetchPage');

class TangThuVien extends Strategy {
	async extractData(url, type) {
		//const data = await fetchPage(url);
		//const $ = cheerio.load(data);
		console.log('Tang Thu Vien');
	}
}

module.exports = TangThuVien;