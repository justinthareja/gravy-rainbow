var db = require('../config/db.js');
var mailer = require('../config/mailer.js');
var getDefinition = require('../utils/getDefinition.js');
var renderTemplate = require('../utils/renderTemplate.js');

module.exports = function(app) {

  // The big show. 
  app.get('/email', function(req, res) {
    db.getDailyWord() // Get a random word that hasn't been sent
      .then(getDefinition) // Extend it with properties from m-w
      .then(function(word) {
        return [
          renderTemplate(word), // Render the html string
          db.getEmailRecipients() // Get all email recipients
        ];
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

  app.get('/test', function(req, res) {
    db.getDailyWord()
      .then(getDefinition)
      .then(function(word) {
        return [
          renderTemplate(word),
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
  
};
