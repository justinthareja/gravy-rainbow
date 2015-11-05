var sendMail = require('./config.js');

var mailOptions = {
  from: 'Justin Thareja <justinthareja@gmail.com>',
  to: 'JUSTHACK <justin.thareja@hackreactor.com>',
  subject: 'greetings from my comput0r',
  html: '<h1>pewpew</h1>',
  text: 'i hope you\'re having a lovely day'
};

sendMail(mailOptions)
  .tap(console.log);