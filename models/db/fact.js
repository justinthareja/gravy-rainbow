var mongoose = require('mongoose');

var factSchema = mongoose.Schema({
  fact: {type: String, required: true, unique: true},
  url: {type: String, required: true},
  sentTimestamp: Date
});

var Fact = mongoose.model('Fact', factSchema);

module.exports = Fact;