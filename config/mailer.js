var nodemailer = require('nodemailer');
var mailgunTransport = require('nodemailer-mailgun-transport');
var Promise = require('bluebird');
var transporter = nodemailer.createTransport(mailgunTransport({
  auth: {
    api_key: 'key-2aeb02588800dc582c4cd4eeb6852179',
    domain: 'sandbox09720d29b4aa418ea884e8767134a64b.mailgun.org'
  }
}));

var defaultFrom = 'vocab@gravyrainbow.com';
var defaultSubject = 'Your daily GRE vocabulary word';

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
      from: defaultFrom,
      to: recipient,
      subject: defaultSubject,
      html: htmlString
    };
  }

};


