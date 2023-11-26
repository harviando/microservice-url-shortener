require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const urlParser = require('url');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Schema Init
const Schema = mongoose.Schema;

const urlSchema = new Schema ({
  original_link: {
    type: String,
    required: true,
  },
  short_link: Number,
});

// Model Init
let Url = mongoose.model('url', urlSchema);

app.get('/api/shorturl', function(req, res) {
  res.json({
    
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
