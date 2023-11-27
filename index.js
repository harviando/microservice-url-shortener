require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const { MongoClient } = require('mongodb');
const mySecret = process.env['MONGO_URI'];
const client = new MongoClient(mySecret);

const db = client.db('urlshortener');
const urls = db.collection('urls');


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
  res.json({
    your_duplicate_body: 'success', 
  });

  console.log(body);
});
                              
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
