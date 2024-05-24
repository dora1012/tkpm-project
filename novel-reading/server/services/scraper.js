const scraperNovelContent= require('./scraperNovelContent.js')


const scraperHomePage =  (browser, url) => new Promise(async (resolve, reject) => {
    try{
        let page= await browser.newPage()
        console.log('New page created')
        await page.goto(url)
        console.log('Page navigated to ' + url)
        await page.waitForSelector('#wrap')
        console.log('Page loaded');
    
        let truyenHot = await page.$$eval('#intro-index .index-intro .item', els => {
            return els.map(element => {
                const title = element.querySelector('.title h3').textContent;
                const link = element.querySelector('a').href;
                const image = element.querySelector('.item-img').src;
                return { title, link, image };
            });
        });
        
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
        

        const theLoaiTruyen = await page.$$eval('.list.list-truyen.list-cat.col-xs-12 .row a', links => {
            return links.map(link => {
                return { title: link.textContent.trim(),
                         url: link.href 
                       };
            });
        });

        const truyenDaHoanThanh = await page.$$eval('.list.list-thumbnail.col-xs-12 .row a', links => {
            return links.map(link => {
                const title = link.querySelector('.caption h3').textContent.trim();
                const url = link.href;
                const img = link.querySelector('.lazyimg').getAttribute('data-image');
                const alt = link.querySelector('.lazyimg').getAttribute('data-alt');
                const description = link.querySelector('.caption small').textContent.trim();
                return { title, url, img, alt, description };
            });
        });

        

        //console.log(truyenDaHoanThanh);
        console.log(truyenHot);
        
        

        // for(let el of truyenHot){
        //     await scraperNovelInfor.scraperNovelInfor(el.link)
        // }

        await page.close()
        resolve()
        
    }
    catch(err){
        console.log("Could not resolve at scrapter of truyenHot => ", err);
        reject(err);
    }
}) 


module.exports = {
    scraperHomePage
    };
