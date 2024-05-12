const scraper= require('./scraper')

const scraperController = async (browserInstance) => {
    const url = 'https://truyenfull.vn/'
    try{
        let browser = await browserInstance;
        await scraper.topTruyen(browser, url)
        await scraper.truyenMoiCapNhat(browser, url)
    }
    catch(err){
        console.log("Could not resolve at scraperController => ", err);
    }
}
module.exports = scraperController