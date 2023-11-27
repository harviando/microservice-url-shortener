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
    // Saving the url to MongoDB
      // checking if the url is already exist or not, and respond accordingly
    urls.findOne({ original_url: url }, (err, data) => {
      if (err) return console.log(err);
      if (data) {
        return res.json({
          original_url: data.original_url,
          short_url: data.short_url
        });
      } else {
        // write code to assign the unique short url here
      }
      
    })
  });
});
                              
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
