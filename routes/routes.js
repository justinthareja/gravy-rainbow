var db = require('../config/db.js');
var mailer = require('../config/mailer.js');
var getDefinition = require('../utils/getDefinition.js');
var renderTemplate = require('../utils/renderTemplate.js');

module.exports = function(app) {

  app.get('/email', function(req, res) {
    db.getDailyWord()
      .then(getDefinition)
      .then(renderTemplate)
      // .then(mailer.generateEmailOptions)
      // .then(mailer.send)
      .then(function(info) {
        res.status(200).send(info);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });
  
};
