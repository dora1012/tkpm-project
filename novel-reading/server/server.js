const express = require('express');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
const hostname = process.env.HOST_NAME || 'localhost';

const request = require('request-promise');
const cheerio = require('cheerio');

const startBrowser = require('./services/browser');
const scraperController = require('./services/scraperController');

let browser= startBrowser();
  scraperController(browser);
app.get('/', async (req, res) => {
  let browser= startBrowser();
  scraperController(browser);
});

app.listen(port, hostname, () => { 
  console.log(`Server is running on http://${hostname}:${port}`);
})