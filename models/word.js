var mongoose = require('mongoose');

var wordSchema = mongoose.Schema({
  word: String,
  sent: Boolean
});

wordSchema.methods.getDailyWord = function() {
  return this.model('Word').find({ sent: false })
    .then(function(words) {
      var i = Math.floor(Math.random() * words.length);
      var word = words[i];
      word.sent = true;
      return word;
    });
};

var Word = mongoose.model('Word', wordSchema);

module.exports = Word;