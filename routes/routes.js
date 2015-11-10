var db = require('../models/db.js');
var mailer = require('../models/mailer.js');
var getDefinition = require('../models/dictionary.js');
var renderTemplate = require('../models/renderTemplate.js');

module.exports = function(app) {

  // The big show. 
  app.get('/email/:template', function(req, res) {
    db.getDailyWord.call(db) // Get a random word that hasn't been sent
      .then(getDefinition) // Extend it with properties from m-w
      .then(function(word) {
        return Promise.all([
          renderTemplate(word, req.params.template), // Render the html string
          db.getEmailRecipients() // Get all email recipients
        ]);
      })
      .spread(mailer.generateEmailOptions) // Generate an options object for the mailer
      .then(mailer.send) // Fire it off
      .then(function(info) {
        res.status(200).send(info); // Respond with node-mailers message
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  app.get('/test/:template', function(req, res) {
    db.getDailyWord.call(db)
      .then(getDefinition)
      .then(function(word) {
        return [
          renderTemplate(word, req.params.template),
          db.getEmailRecipients()
        ];
      })
      .spread(mailer.generateEmailOptions)
      .then(function(info) {
        res.status(200).send(info);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  app.post('/users/create', function(req, res) {
    db.createNewUser(req.body)
      .then(function(user) {
        res.status(201).send(user);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  app.get('/users', function(req, res) {
    db.getAllUsers()
      .then(function(users) {
        res.status(200).send(users);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  app.get('/words/weekly', function(req, res) {
    db.getWeeklySummary()
      .then(function(words) {
        res.status(200).send(words);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });
  
};
