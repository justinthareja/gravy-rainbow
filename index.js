var express = require('express');
var mongoose = require('mongoose');
var db = require('./config/db.js');
var scheduler = require('./config/scheduler.js');
var getDefinition = require('./utils/getDefinition.js');
var createTemplate = require('./utils/createTemplate.js');
var mailer = require('./config/mailer.js');

var app = express();
var port = process.env.PORT || 1337;

mongoose.connect(db.uri);
mongoose.Promise = require('bluebird');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', db.initialize.bind(db));

scheduler.initialize();

app.listen(port);

console.log('SERVER: Launch party on port:', port);

app.get('/email', function(req, res) {
  db.getDailyWord()
    .then(getDefinition)
    .then(createTemplate)
    .then(mailer.generateEmailOptions)
    .then(mailer.send)
    .then(function(info) {
      res.json(info);
    });
});
