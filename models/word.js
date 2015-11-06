var mongoose = require('mongoose');

var wordSchema = mongoose.Schema({
  word: String,
  sent: Boolean,
  sentTimestamp: Date
});

var Word = mongoose.model('Word', wordSchema);

module.exports = Word;