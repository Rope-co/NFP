const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

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
    origin: 'http://localhost:3000',
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
