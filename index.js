var express = require('express');
var mongoose = require('mongoose');
var db = require('./models/db.js');
var bodyParser = require('body-parser');
// var scheduler = require('./models/scheduler.js');
var config = require('./config.js');

// Create server instance
var app = express();

// Inject middleware
app.use(bodyParser.json());

// Connect to db
mongoose.connect(config.db.uri);
mongoose.Promise = require('bluebird');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', db.initialize);

// Inject routes
require('./routes/routes.js')(app);

app.use(function(err, req, res, next) {
  var e = err.message ? err.message : err;
  res.status(400).send(e);
})

// Listen to incoming requests
app.listen(config.port);

console.log('SERVER: Launch party on port:', config.port);