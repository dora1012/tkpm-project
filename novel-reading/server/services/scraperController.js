const scraper= require('./scraper')
const scraperNovelContent= require('./scraperNovelContent')
const scraperNovelInfor= require('./scraperNovelInfor')

const scraperController = async (browserInstance) => {
    const url = 'https://truyenfull.vn/tu-cam-270192/'
    try{
        let browser = await browserInstance;
        //await scraper.scraperHomePage(browser, url)
        await scraperNovelInfor.scraperNovelInfor(browser, url)
    }
    catch(err){
        console.log("Could not resolve at scraperController => ", err);
    }
}
module.exports = scraperController