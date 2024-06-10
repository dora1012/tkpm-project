const { crawlNovelList } = require('../services/crawlListPage');
const { defaultSource } = require('../config/sources');
const Crawler = require('../services/crawler');
const TruyenFull = require('../services/crawlerTruyenFull');

const crawler = new Crawler(new TruyenFull());

// used for Novel List of A Author
const getNovelListOfAuthor = async (req, res) => {
  try {
    const { authorSlug } = req.params;
    const authorUrl = `${defaultSource}/tac-gia/${authorSlug}/`
    const novels = await crawlNovelList(authorUrl);
    res.json(novels);  
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL LIST OF AUTHOR CONTROLLER' });
  }
};

const getMaxPaginationNumber = async(req,res)=>{
  try{
    const { authorSlug } = req.params;
    let authorUrl = `${defaultSource}/tac-gia/${authorSlug}/`;
    const num = await crawlMaxPaginationNumber(authorUrl);
    res.json(num); 
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - MAX PAGE NUM OF AUTHOR CONTROLLER' });
  }
}
module.exports = {
    getNovelListOfAuthor,
    getMaxPaginationNumber
};
