const axios = require('axios');
const cheerio = require('cheerio');

class Strategy {
    async crawl(url, type) {
        try {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            const $ = cheerio.load(response.data);

            return this.extractData($, type);

        } catch (error) {
            console.error(`There was an error fetching the URL: ${error}`);
            throw new Error('Failed to fetch novels');
        }
    }

    async extractData($, type) {
        throw new Error('You have to implement the method extractData!');
    }
}

module.exports = Strategy;

// class Source2 extends Source {
//     extractData($, TruyenHot) {
//         // Different implementation for Source2
//     }
// }