var db = require('../models/db.js');
var mailer = require('../models/mailer.js');
var renderTemplate = require('../models/renderTemplate.js');
var getTemplateData = require('../models/getTemplateData.js');

module.exports = {

  sendEmail: function(req, res) {
    getTemplateData(req.params.service, req.params.template)
      .then(function(data) {
        return Promise.all([
          renderTemplate(data, req.params.template),
          db.getEmailRecipients(req.params.service),
          req.params.template
        ]);
      })
      .spread(mailer.generateEmailOptions)
      .then(mailer.send)
      .then(function(info) {
        res.status(200).send(info);
      })
      .catch(function(err) {
        res.status(500).send({ error: err });
      });
  },

  sendTest: function(req, res) {
    getTemplateData(req.params.service, req.params.template)
      .then(function(data) {
        return Promise.all([
          renderTemplate(data, req.params.template),
          db.getEmailRecipients(req.params.service),
          req.params.template
        ]);
      })
      .spread(mailer.generateEmailOptions)
      .then(function(info) {
        res.status(200).send(info);
      })
      .catch(function(err) {
        res.status(500).send({ error: err });
      });
  },

  createNewUser: function(req, res) {
    db.createNewUser(req.body, req.params.service)
      .then(function(user) {
        res.status(201).send(user);
      })
      .catch(function(err) {
        res.status(400).send({ error: err });
      });
  },

  getAllUsers: function(req, res) {
    db.getAllUsers()
      .then(function(users) {
        res.status(200).send(users);
      })
      .catch(function(err) {
        res.status(500).send({ error: err });
      });
  },

  getWeeklySummary: function(req, res) {
    db.getWeeklySummary()
      .then(function(words) {
        res.status(200).send(words);
      })
      .catch(function(err) {
        res.status(500).send({ error: err });
      });
  }

}