const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://abiodun_mastery:Testing123@cluster0.jupgc1f.mongodb.net/?retryWrites=true&w=majority'
);

const db = mongoose.connection;

db.on('error', console.log.bind(console, 'connection error'));
db.once('open', function (callback) {
  console.log('connection succeeded');
});

const app = express();
app.use(
  cors({
    // origin: 'http://127.0.0.1:5500', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    optionsSuccessStatus: 200,
  })
);
const path = require('path');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/sign_up', function (req, res) {
  console.log(req.body);
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var timestamp = new Date();

  var data = {
    name: name,
    email: email,
    phone: phone,
    timestamp: timestamp,
  };
  db.collection('details').insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log('Record inserted Successfully');
  });

  return res.redirect('frontend/index.html');
});

app
  .get('/', function (req, res) {
    res.set({
      'Access-control-Allow-Origin': '*',
    });
    return res.redirect('index.html');
  })
  .listen(5000);

console.log('server listening at port 5000');
