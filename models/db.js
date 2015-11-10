var Promise = require('bluebird');
var fs = require('fs');
var read = Promise.promisify(fs.readFile);
var Word = require('./db/word.js');
var User = require('./db/user.js');
var config = require('../config.js');

module.exports = {

  // Used to initialize database on a fresh deployment
  initialize: function() {
    console.log('DB: successfully opened database connection to:', config.db.uri);
    return Word.find({})
      .then(function(words) {
        if(words.length === 0) {
          console.log('DB: initializing words table...');
          return read('words.json', 'utf-8');
        }
        throw('DB: words table populated... short circuiting initialization');
      })
      .then(function(words) {
        return Promise.map(JSON.parse(words), function(word) {
          return Word.create({
            word: word,
            sent: false
          });
        });
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
  // Returns a list of words sent within the past week
  getWeeklySummary: function() {
    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return Word.find({
      sentTimestamp: { $lt: new Date(), $gt: oneWeekAgo }
    });
  },

  // Returns one long string of all users from the input service
  // Used in the 'to' field of the email options
  getEmailRecipients: function(service) {
    return User.find({ service: service })
      .then(function(users) {
        return users.map(function(user) {
          return user.name.first + ' ' + user.name.last + ' <' + user.email + '> ';
        });
      })
      .then(function(emailAddresses) {
        return emailAddresses.join(', ');
      });
  },

  createNewUser: function(userInfo, service) {
    return User.find({
      service: service,
      email: userInfo.email
    })
    .then(function(user) {
      var userExists = user.length > 0;
      if (!userExists) {
        return User.create({
          name: userInfo.name,
          email: userInfo.email,
          service: service
        });
      }
      throw('User already exists');
    });
  },

  getAllUsers: function(service) {
    return User.find({});
  },

  

};


// Resets the sent flags of all the sent words to false
// Invoked when getDailyWord doesn't find any unsent words
// Returns a list of newly updated words
function recycleSentWords() {
  console.log('DB: recycling sent words');
  return Word.find({ sent: true })
    .then(function(words) {
      return Promise.map(words, function(word) {
        word.sent = false;
        return word.save();
      });
    });
}



