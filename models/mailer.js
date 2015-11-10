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

  generateEmailOptions: function(htmlString, recipient) {
    if (!(htmlString && recipient)) {
      throw new Error('MAILER: No recipients or html to generate options with');
    }

    return {
      from: config.mailer.from,
      to: recipient,
      subject: config.mailer.subject,
      html: htmlString
    };
  }

};


