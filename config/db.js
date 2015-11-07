var Word = require('../models/word.js');
var Promise = require('bluebird');
var fs = require('fs');
var read = Promise.promisify(fs.readFile);

module.exports = {

  uri: process.env.MONGO_URI || 'mongodb://localhost/test',

  initialize: function() {
    console.log('DB: successfully opened database connection to:', this.uri);
    return Word.find({})
      .then(function(words) {
        if(words.length === 0) {
          console.log('DB: initializing words table...');
          return read('words.json', 'utf-8');
        }
        throw('DB: words table populated... short circuiting initialization');
      })
      .then(function(words) {
        words = JSON.parse(words);
        return Promise.all(words.map(function(word) {
          return Word.create({
            word: word,
            sent: false
          });
        }));
      })
      .then(function(createdWords) {
        console.log('DB: words table populated with', createdWords.length, 'words');
      })
      .catch(function(msg) {
        console.log(msg);
      });
  },

  getDailyWord: function() {
    return Word.find({ sent: false })
      .then(function(words) {
        var i = Math.floor(Math.random() * words.length);
        return words[i];
      })
      .then(function(word) {
        word.sent = true;
        word.sentTimestamp = new Date();
        return word.save();
      })
      .then(function(dailyWord) {
        return dailyWord.word;
      });

  }

};

