const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const hostname = process.env.HOST_NAME || 'localhost';
const route = require('./routes');
const parserBody = require('body-parser'); // Import the body-parser module

app.use(cors());
app.use(parserBody.json());

route(app);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
