var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var babel = require('babel-register');

//Connect to mongodb
var mongoConnect = 'mongodb://localhost/ToDo';
mongoose.connect(mongoConnect, (err) => {
    if (err) throw err;
    console.log('Successfully connected to the database !!');
});

var router = express.Router();
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});

//For testing our api
app.get('/', (req, res) => {
    res.send('It works');
    console.log("It Works !!");
})

// Routes
app.use('/api', require('./routes/todo'));


app.listen(4000);
console.log('Listening on port 4000 !!');

