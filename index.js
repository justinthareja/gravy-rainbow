var express = require('express');
var mongoose = require('mongoose');
var db = require('./config/db.js');
var scheduler = require('./config/scheduler.js');


var app = express();
var port = process.env.PORT || 1337;

// Initialize database
mongoose.connect(db.uri);
mongoose.Promise = require('bluebird');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', db.initialize.bind(db));

// Inject routes
require('./routes/routes.js')(app);

// Initialize email scheduler
scheduler.initialize();

// Listen to incoming requests
app.listen(port);

console.log('SERVER: Launch party on port:', port);