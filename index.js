var express = require('express');
var mongoose = require('mongoose');
var db = require('./config/db.js');
var scheduler = require('./utils/scheduler.js');

var app = express();
var port = process.env.PORT || 1337;

mongoose.connect(db.uri);
mongoose.Promise = require('bluebird');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', db.initialize.bind(db));

scheduler.initialize();

app.listen(port);

console.log('Launch party on port:', port);

app.get('/', function(req, res) {
  res.send('hello there');
});

