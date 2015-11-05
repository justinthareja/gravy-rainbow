var nodemailer = require('nodemailer');
var config = require('./config.js');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.gmail.user,
        pass: config.gmail.password
    }
});

var mailOptions = {
  from: 'Justin Thareja <justin.thareja@gmail.com>',
  to: 'Justin At Hackreactor <justin.thareja@hackreactor.com',
  subject: 'hello',
  text: 'hello world!'
};

transporter.sendMail(mailOptions, function(error, info) {
  if(error) {
    console.log(error);
  }
  console.log(info);
});