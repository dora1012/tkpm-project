class Strategy {
    async crawl(url, type) {
        try {
            const result = await this.extractData(url, type);
            return result;
        } catch (error) {
            console.error(`There was an error while crawling: ${error}`);
            throw new Error('Failed to crawl');
        }
    }

    async crawlWithAsyncHandles(url, type) {
        try {
            const result = await this.extractDataWithAysncHandles(url, type);
            return result;
        }
        catch (error) {
            console.error(`There was an error while crawling with extra handles: ${error}`);
            throw new Error('Failed to crawl with extra handles');
        }
    }

    async extractData(url, type) {
        throw new Error('You have to implement the method extractData!');
    }

    async extractDataWithAysncHandles(url, type) {
        throw new Error('You have to implement the method extractDataWithExtraHandles!');
    }
}

module.exports = Strategy;

// class Source2 extends Source {
//     extractData($, TruyenHot) {
//         // Different implementation for Source2
//     }
// }