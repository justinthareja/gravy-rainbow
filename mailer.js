var sendMail = require('./config.js');

var mailOptions = {
  from: 'Justin Thareja <justinthareja@gmail.com>',
  to: 'JUSTHACK <justin.thareja@hackreactor.com>',
  subject: 'greetings from my comput0r',
  html: '<h1>pewpew</h1>',
  text: 'i hope you\'re having a lovely day'
};

// sendMail(mailOptions)
//   .tap(console.log);

/*
every day:

grab a random word that hasn't already been sent 
  initialize a words table with a sent flag, either true or false
extend into a word obj with  part of speech and definition added
generate an html template for the body of the email with the word obj
generate mailOptions (can be multiple)
send a mail with each set of mailOptions

*/