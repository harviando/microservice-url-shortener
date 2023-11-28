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
const urls = db.collection('url');

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

app.post('/api/shorturl',async function(req, res) {
  const { url } = req.body;

  try {
    // Url validation
    new URL(url);
  } catch (error) {
    return res.json({ status: 'Invalid URL', error: error.message });
  }

  const hostname = new URL(url).hostname;

  try {
    // DNS lookup
    const address = await new Promise(resolve => {
      dns.lookup(hostname, (err, address) => {
        resolve({ err, address });
      });
    });
    
    if (address.err || !address.address) {
      return res.json({ status: 'Invalid URL', error: 'Invalid Hostname' });
    }

    //MongoDB Operations
    const existingUrl = await urls.findOne({ original_url: url });
    if (existingUrl) {
      return res.json({
        original_url: existingUrl.original_url,
        short_url: existingUrl.short_url
      });
    };

    const urlCount = await urls.countDocuments({});
    const urlDoc = {
      original_url: url,
      short_url: urlCount
    };

    const result  = await urls.insertOne(urlDoc);
    res.json({
      original_url: url,
      short_url: urlCount
    });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.get('/api/shorturl/:shortUrl', async function(req, res) {
  const { shortUrl } = req.params;

  try {
    // Search the URL doc based on the inputted url
    const existingUrl = await urls.findOne({ short_url: parseInt(shortUrl) });

    // If the url is not found, return an error
    if (!existingUrl) {
      res.status(404).json({ error: 'URL not found' });
    } else {
      // If found then redirect to original url
      res.redirect(existingUrl.original_url);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});
   
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
