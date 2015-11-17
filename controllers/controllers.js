var db = require('../models/db.js');
var mailer = require('../models/mailer.js');
var renderTemplate = require('../models/renderTemplate.js');
var getTemplateData = require('../models/getTemplateData.js');

module.exports = {

  sendEmail: function(req, res, next) {
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
      .catch(next);
  },

  sendTest: function(req, res, next) {
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
      // .spread(function(templateHtml, recipients, templateName) {
      //   res.status(200).send(templateHtml);
      // })
      .catch(next);
  },

  createNewUser: function(req, res, next) {
    db.createNewUser(req.body, req.params.service)
      .then(function(user) {
        res.status(201).send(user);
      })
      .catch(next);
  },

  getAllUsers: function(req, res, next) {
    db.getAllUsers(req.params.service)
      .then(function(users) {
        res.status(200).send(users);
      })
      .catch(next);
  },

  getWeeklySummary: function(req, res, next) {
    db.getWeeklySummary()
      .then(function(words) {
        res.status(200).send(words);
      })
      .catch(next);
  }

}