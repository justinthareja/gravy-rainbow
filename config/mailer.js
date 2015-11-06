var nodemailer = require('nodemailer');
var mailgunTransport = require('nodemailer-mailgun-transport');
var Promise = require('bluebird');

var transporter = nodemailer.createTransport(mailgunTransport({
  auth: {
    api_key: 'key-2aeb02588800dc582c4cd4eeb6852179',
    domain: 'sandbox09720d29b4aa418ea884e8767134a64b.mailgun.org'
  }
}));

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
    recipient = recipient || 'justin.thareja@gmail.com';
    return {
      from: 'vocab@gravyrainbow.com',
      to: recipient,
      subject: 'Your daily GRE vocabulary word',
      html: htmlString
    };
  }

};


