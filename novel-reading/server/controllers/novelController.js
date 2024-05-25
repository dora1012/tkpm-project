const { crawlTruyenMoiCapNhat, crawlTruyenDaHoanThanh } = require('../services/novelCrawl');
const { defaultSource } = require('../config/sources');

// Controller function to handle the request and response asynchronously for Truyen Moi Cap Nhat
const getTruyenMoiCapNhat = async (req, res, next) => {
  const url = defaultSource;  // Get URL from configuration file
  try {
    const novels = await crawlTruyenMoiCapNhat(url);
    res.json(novels);  // Send the array of novels as JSON
  } catch (error) {
    next(error);  // Pass the error to the next middleware (error handler)
  }
};

// Controller function to handle the request and response asynchronously for Truyen Da Hoan Thanh
const getTruyenDaHoanThanh = async (req, res, next) => {
  const url = defaultSource;  // Get URL from configuration file
  try {
    const novels = await crawlTruyenDaHoanThanh(url);
    res.json(novels);  // Send the array of novels as JSON
  } catch (error) {
    next(error);  // Pass the error to the next middleware (error handler)
  }
};

module.exports = {
  getTruyenMoiCapNhat,
  getTruyenDaHoanThanh,
};







