const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const hostname = process.env.HOST_NAME || 'localhost';

const parserBody = require('body-parser'); // Import the body-parser module

app.use(cors());
app.use(parserBody.json());

const mainListRoutes = require('./routes/mainListRoutes');
const catygoryRoutes = require('./routes/categoryRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const novelRoutes = require('./routes/novelRoutes');
const searchRoutes = require('./routes/searchRoutes');
const chapterClassificationRoutes = require('./routes/chapterClassificationRoutes');

app.use('/api/danh-sach', mainListRoutes);
app.use('/api/the-loai', catygoryRoutes);
//app.use('/api', chapterRoutes);
app.use('/api', novelRoutes);
app.use('/api/tim-kiem', searchRoutes);
app.use('/api/phan-loai', chapterClassificationRoutes);
// const novelRoutes = require('./routes/novelRoutes'); // Uncomment this line to import the novelRoutes module
// const searchRoutes = require('./routes/searchRoutes'); // Uncomment this line to import the searchRoutes module
//const {getMainList, getNovelListOfMainList} = require('./controllers/mainListController');
//const {getCategoryList, getNovelListOfCategory} = require('./controllers/categoryController');
//const {getChapter} = require('./controllers/chapterController');
//const {getTruyenHot, getTruyenMoiCapNhat, getTruyenDaHoanThanh, getNovelInfor} = require('./controllers/novelController');
//const {getNovelListOfSearchResult} = require('./controllers/searchController')
//const {getChapterClassificationList, getNovelListOfClassification} = require('./controllers/chapterClassificationController')
//const {get} = require('request-promise');


// Use the routes
// app.use('/api', novelRoutes); // Uncomment this line to use the novelRoutes
// app.use('/api', searchRoutes); // Uncomment this line to use the searchRoutes
// app.use('/api', mainListRoutes);


// Test endpoint for main list
//Navbar API
// app.get('/api/danh-sach',getMainList);
// app.get('/api/danh-sach/:listSlug',getNovelListOfMainList);
// app.get('/api/the-loai', getCategoryList);
// app.get('/api/the-loai/:categorySlug', getNovelListOfCategory);
// app.get('/api/:novelSlug/:chapterSlug',getChapter);
// app.get('/api/phan-loai', getChapterClassificationList);
// app.get('/api/phan-loai/:classificationSlug', getNovelListOfClassification);


//HomePage API
// app.get('/api/truyen-hot', getTruyenHot);
// app.get('/api/truyen-moi-cap-nhat', getTruyenMoiCapNhat);
// app.get('/api/truyen-da-hoan-thanh', getTruyenDaHoanThanh);
// app.get('/api/tim-kiem', getNovelListOfSearchResult);
// app.get('/api/:novelSlug', getNovelInfor);
//Search page



// // Test endpoint for novel list of a specific type
// app.get('/test-novel-list/:listSlug', async (req, res) => {
//   try {
//     const { listSlug } = req.params;
//     const novels = await getNovelListOfMainList({ params: { listSlug } });
//     console.log(novels); // Log the novels list to console
//     res.json(novels); // Send the response as JSON
//   } catch (error) {
//     console.error('Error fetching novel list:', error);
//     res.status(500).json({ error: 'Failed to fetch novel list' });
//   }
// });




// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
