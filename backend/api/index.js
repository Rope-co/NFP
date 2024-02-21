const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
var whitelist = ['http://localhost:3000', '*'];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

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
app.use(cors(corsOptions));

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

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

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
    if (err) {
      console.error('Error inserting record:', err);
      return res.status(500).json({ message: 'Error inserting record' });
    }
    console.log('Record inserted Successfully');
    return res.status(200).json({ message: 'Record inserted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
