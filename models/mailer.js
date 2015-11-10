var nodemailer = require('nodemailer');
var mailgun = require('nodemailer-mailgun-transport');
var Promise = require('bluebird');
var config = require('../config.js');
var transporter = nodemailer.createTransport(mailgun({ auth: config.mailer.auth }));

module.exports = {
  
  send: function(mailOptions) {
    return new Promise(function(resolve, reject) {
      transporter.sendMail(mailOptions, function(err, info) {
        if(err) reject(err);
        resolve(info);
      });
    });
  },

  generateEmailOptions: function(htmlString, recipient, template) {

    if (!(htmlString && recipient)) {
      throw ('MAILER: No recipients or html to generate email options with');
    }

    return {
      from: config.mailer[template].from,
      to: recipient,
      subject: config.mailer[template].subject,
      html: htmlString
    };
  }

};


