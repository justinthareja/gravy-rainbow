var db = require('../config/db.js');
var mailer = require('../config/mailer.js');
var getDefinition = require('../utils/getDefinition.js');
var createTemplate = require('../utils/createTemplate.js');

module.exports = function(app) {

  app.get('/email', function(req, res) {
    db.getDailyWord()
      .then(getDefinition)
      .then(createTemplate)
      .then(mailer.generateEmailOptions)
      .then(mailer.send)
      .then(function(info) {
        res.json(info);
      })
      .catch(function(err) {
        res.send(400);
      });
  });
  
};
