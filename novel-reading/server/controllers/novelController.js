const {   crawlTruyenHot, crawlTruyenMoiCapNhat, crawlTruyenDaHoanThanh, } = require('../services/crawlHomePage');
const {crawlNovelInfo}= require('../services/crawlNovelInforPage')
const { defaultSource } = require('../config/sources');


// const searchUrl=`${searchUrl}/tim-kiem`;

// used for Home Page 
const getTruyenHot = async (req, res) => {
  try {
    const truyenHot = await crawlTruyenHot(defaultSource);
    res.json(truyenHot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - TRUYEN HOT CONTROLLER' });
  }
};

// used for Home Page 
const getTruyenMoiCapNhat = async (req, res) => {
  try {
    const truyenMoiCapNhat = await crawlTruyenMoiCapNhat(defaultSource);
    res.json(truyenMoiCapNhat);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - TRUYEN MOI CAP NHAT CONTROLLER' });
  }
};

// used for Home Page 
const getTruyenDaHoanThanh = async (req, res) => {
  try {
    const truyenDaHoanThanh = await crawlTruyenDaHoanThanh(defaultSource);
    res.json(truyenDaHoanThanh);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - TRUYEN DA HOAN THANH CONTROLLER' });
  }
};


// used for Novel Infor Page
const getNovelInfor= async (req, res) => {
  try {
    const{novelSlug} =req.params;
    const url= `${defaultSource}/${novelSlug}/`
    const novelInfor = await crawlNovelInfo(url);
    res.json(novelInfor);  
  } catch (error) {  
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - NOVEL INFOR CONTROLLER' });
  }
};



module.exports = {
  getTruyenHot,
  getTruyenMoiCapNhat,
  getTruyenDaHoanThanh,
  getNovelInfor
};
