const source = require('../config/sources.js');

class Crawler {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    async crawl(url, type) {
        return await this.strategy.crawl(url, type);
    }

}

module.exports = Crawler;