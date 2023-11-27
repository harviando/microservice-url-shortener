require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Connect to MongoDB
const { MongoClient } = require('mongodb');
const mySecret = process.env['MONGO_URI'];
const client = new MongoClient(mySecret);

// Specify the db and it's collection
const db = client.db('urlshortener');
const urls = db.collection('urls');

// url needs
const urlParser = require('url');
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  const { url } = req.body;

  // Url validation
  try {
    new URL(url);
  } catch (error) {
    return res.json({ status: 'Invalid URL', error: error });
  }

  // DNS lookup
  const hostname = new URL(url).hostname;
  dns.lookup(hostname, (err, address) => {
    if (err || !address) {
      return res.json({ status: 'Invalid URL', error: err || 'Invalid Hostname'  });
    }
    res.json({ status: 'This is a vaid Hostname URL' });
  });
});
                              
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
