const scraperTrangChu =  (browser, url) => new Promise(async (resolve, reject) => {
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
       // console.log(truyenHot);
        
        const scraperDetail= async(link)=>new Promise(async (resolve, reject)=>{
            try{
                let pageDetail= await browser.newPage()
                await pageDetail.goto(link)
                console.log('Page navigated to ' + link);
                await pageDetail.waitForSelector('#wrap')
                
                
                // const detailData = await page.$eval('.col-xs-12.col-info-desc', detail => {
                //     const title = detail.querySelector('.title').textContent.trim();
                //     const img = detail.querySelector('.info-holder .book img').getAttribute('src');
                //     const author = detail.querySelector('.info-holder div:nth-child(1) a').textContent.trim();
                //     const genres = Array.from(detail.querySelectorAll('.info-holder div:nth-child(2) a')).map(genre => genre.textContent.trim());
                //     const source = detail.querySelector('.info-holder div:nth-child(3) .source').textContent.trim();
                //     const status = detail.querySelector('.info-holder div:nth-child(4) .text-success').textContent.trim();
                //     const rating = detail.querySelector('.rate-holder').getAttribute('data-score');
                //     const ratingValue = detail.querySelector('[itemprop="aggregateRating"] [itemprop="ratingValue"]').textContent.trim();
                //     const ratingCount = detail.querySelector('[itemprop="aggregateRating"] [itemprop="ratingCount"]').textContent.trim();
                //     const description = detail.querySelector('.desc-text').textContent.trim();
                    
                //     return { title, img, author, genres, source, status, rating, ratingValue, ratingCount, description };
                // });

                
                await pageDetail.close()
                console.log('Page closed '+ link);
                resolve()
            } catch(err){
                console.log("Could not resolve at scraperDetail => ", err);
                reject(err);
            }
        })

        for(let el of truyenHot){
            await scraperDetail(el.link)
        }

        await page.close()
        resolve()
        
    }
    catch(err){
        console.log("Could not resolve at scrapter of truyenHot => ", err);
        reject(err);
    }
}) 


module.exports = {
    scraperTrangChu
    };
