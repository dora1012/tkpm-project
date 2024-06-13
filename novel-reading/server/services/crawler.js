const source = require('../config/sources.js');
const TruyenFull = require('./crawlerTruyenFull');
const TangThuVien = require('./crawlerTangThuVien');

class Crawler {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(source) {
        switch (source) {
            case 'truyenfull':
                this.strategy = new TruyenFull();
                break;
            case 'tangthuvien':
                this.strategy = new TangThuVien();
                break;
            default:
                throw new Error('Invalid source');
        }
    }


    async crawl(url, type) {
        return await this.strategy.crawl(url, type);
    }

    async crawlWithAsyncHandles(url, type) {
        return await this.strategy.crawlWithAsyncHandles(url, type);
    }

}

module.exports = Crawler;