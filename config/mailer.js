var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var Promise = require('bluebird');

// Define options for mailgun authentication
var options = {
  auth: {
    api_key: 'key-2aeb02588800dc582c4cd4eeb6852179',
    domain: 'sandbox09720d29b4aa418ea884e8767134a64b.mailgun.org'
  }
};

// Create nodemailer transporter with mailgun
var transporter = nodemailer.createTransport(mg(options));

// var exampleMailOptions = {
//     from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
//     to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ✔', // plaintext body
//     html: '<b>Hello world ✔</b>' // html body
// };

module.exports = {
  
  send: function(mailOptions) {
    return new Promise(function(resolve, reject) {
      transporter.sendMail(mailOptions, function(err, info) {
        if(err) reject(err);
        resolve(info);
      });
    });
  }

}


