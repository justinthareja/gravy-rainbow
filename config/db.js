var Word = require('../models/word.js');
var User = require('../models/user.js');
var Promise = require('bluebird');
var fs = require('fs');
var read = Promise.promisify(fs.readFile);

module.exports = {

  uri: process.env.MONGOLAB_URI || 'mongodb://localhost/test',
  // Used to initialize database on a fresh deployment
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
            sent: true
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
  // Returns a random word from the database that hasn't been sent yet, passed to getDefinition
  getDailyWord: function() {
    return Word.find({ sent: false })
      .then(function(words) {
        if (words.length === 0) {
          console.log('DB: no unsent words found, recycling sent words');
          return recycleSentWords();
        }
        return words;
      })
      .then(function(words){
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
  },
  // Returns one long string of all users, used in the to: field of the email options
  getEmailRecipients: function() {
    return User.find({})
      .then(function(users) {
        return users.map(function(user) {
          return user.name.first + ' ' + user.name.last + ' <' + user.email + '> ';
        });
      })
      .then(function(emailAddresses) {
        return emailAddresses.join(', ');
      });
  }

};

// Resets the sent flags of all the sent words to false
// Invoked when getDailyWord doesn't find any unsent words
// Returns a list of newly updated words
function recycleSentWords() {
  return Word.find({ sent: true })
    .then(function(words) {
      return Promise.map(words, function(word) {
        word.sent = false;
        return word.save();
      });
    });
}

