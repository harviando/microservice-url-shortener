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
  let body = req.body;

  // Url validation
  const dnsLookup = dns.lookup(new URL(req.body.url).hostname, async (err, address) => {
    if (!address) {
      res.json({ status: 'Invalid URL', error: err});
    } else {
      res.json({ status: 'This is a valid url.' });
    }
  });
  
});
                              
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
