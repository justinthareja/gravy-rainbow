var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var Promise = require('bluebird');

var options = {
  auth: {
    api_key: 'key-2aeb02588800dc582c4cd4eeb6852179',
    domain: 'sandbox09720d29b4aa418ea884e8767134a64b.mailgun.org'
  }
};

var transporter = nodemailer.createTransport(mg(options));

module.exports = function(mailOptions) {
  return new Promise(function(resolve, reject) {
    transporter.sendMail(mailOptions, function(err, info) {
      if(err) { reject(err); }
      resolve(info);
    });
  });
};

