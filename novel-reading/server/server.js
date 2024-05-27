const express = require('express');
const cors = require('cors')
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
const hostname = process.env.HOST_NAME || 'localhost';


const parserBody = require('body-parser'); // Import the body-parser module


// const novelRoutes = require('./routes/novelRoutes'); // Uncomment this line to import the novelRoutes module
// const searchRoutes = require('./routes/searchRoutes'); // Uncomment this line to import the searchRoutes module
const mainListRoutes = require('./routes/mainListRoutes');
const { getMainList, getNovelListOfMainList } = require('./controllers/mainListController');
const{getChapterContent} = require('./controllers/chapterController');
const { get } = require('request-promise');

app.use(cors());
app.use(parserBody.json());


// Use the routes
// app.use('/api', novelRoutes); // Uncomment this line to use the novelRoutes
// app.use('/api', searchRoutes); // Uncomment this line to use the searchRoutes
app.use('/api', mainListRoutes); 

// Test endpoint for main list
// app.get('/test-main-list',getNovelListOfMainList);


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
