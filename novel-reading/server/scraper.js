const topTruyen =  (browser, url) => new Promise(async (resolve, reject) => {
    try{
        let page= await browser.newPage()
        console.log('New page created')
        await page.goto(url)
        console.log('Page navigated to ' + url)
        await page.waitForSelector('#wrap')
        console.log('Page loaded');
    
        let topTruyen = await page.$$eval('#intro-index .index-intro .item', els => {
            return els.map(element => {
                const title = element.querySelector('.title h3').textContent;
                const link = element.querySelector('a').href;
                const image = element.querySelector('.item-img').src;
                return { title, link, image };
            });
        });
       // console.log(topTruyen);

        await page.close()
        resolve()
        
    }
    catch(err){
        console.log("Could not resolve at scrapter of topTruyen => ", err);
        reject(err);
    }
}) 

const truyenMoiCapNhat = async (browser, url) => {
    try {
        let page = await browser.newPage();
        console.log('New page created');
        await page.goto(url);
        console.log('Page navigated to ' + url);
        await page.waitForSelector('.list.list-truyen.list-new.col-xs-12.col-sm-12.col-md-8.col-truyen-main');
        console.log('Page loaded');

        const truyenMoiCapNhat = await page.$$eval('.list.list-truyen.list-new.col-xs-12.col-sm-12.col-md-8.col-truyen-main .row[itemtype="https://schema.org/Book"]', rows => {
            return rows.map(row => {
                const title = row.querySelector('.col-title h3 a').textContent;
                const link = row.querySelector('.col-title h3 a').href;
                const categories = Array.from(row.querySelectorAll('.col-cat a')).map(cat => cat.textContent);
                const chapter = row.querySelector('.col-chap a').textContent.trim();
                const chapterLink = row.querySelector('.col-chap a').href;
                const time = row.querySelector('.col-time').textContent.trim();
                return { title, link, categories, chapter, chapterLink, time };
            });
        });
        console.log(truyenMoiCapNhat);

        await page.close();
        return truyenMoiCapNhat;

    } catch (err) {
        console.log("Could not resolve at scraper => ", err);
        throw err;
    }
};

module.exports = {
    truyenMoiCapNhat
};





module.exports={
    topTruyen, 
    truyenMoiCapNhat
}