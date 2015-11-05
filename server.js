var express = require('express');
var mongoose = require('mongoose');

var app = express();
var port = 1337;


var DB_URI = 'mongodb://localhost/test';

mongoose.connect(DB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('successfully connected to: ', DB_URI);
});

var wordSchema = mongoose.Schema({
  word: String,
  sent: Boolean
});

var Word = mongoose.model('Word', wordSchema);

app.listen(port);

console.log('Launch party on port:', port);


app.get('/', function(req, res) {
  res.send('hello there');
});

