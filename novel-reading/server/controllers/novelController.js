const { crawlTruyenMoiCapNhat, crawlTruyenDaHoanThanh } = require('../services/novelCrawl');
const { sources } = require('../config/sources');
const searchUrl= sources.truyenfull.url

searchUrl=`${searchUrl}/tim-kiem`;

const getTruyenMoiCapNhat = async (req, res) => {
  const url = defaultSource;  // Get URL from configuration file
  try {
    const novels = await crawlTruyenMoiCapNhat(url);
    res.json(novels);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getTruyenDaHoanThanh = async (req, res) => {
  const url = defaultSource; 
  try {
    const novels = await crawlTruyenDaHoanThanh(url);
    res.json(novels);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getTruyenMoiCapNhat,
  getTruyenDaHoanThanh,
};
