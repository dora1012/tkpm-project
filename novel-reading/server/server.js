const express = require('express');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
const hostname = process.env.HOST_NAME || 'localhost';

const request = require('request-promise');
const cheerio = require('cheerio');

const novelRoutes = require('./routes/novelRoutes');


  
app.get('/', async (req, res) => {
   
});
app.use(express.json());

app.use('/api', novelRoutes);
app.use('/api', searchRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, hostname, () => { 
  console.log(`Server is running on http://${hostname}:${port}`);
})