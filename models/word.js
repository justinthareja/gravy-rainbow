var mongoose = require('mongoose');

var wordSchema = mongoose.Schema({
  word: String,
  sent: Boolean
});

var Word = mongoose.model('Word', wordSchema);

module.exports = Word;