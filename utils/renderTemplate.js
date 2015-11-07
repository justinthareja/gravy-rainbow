var Promise = require('bluebird');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');

module.exports = function(data) {
  
  return new Promise(function(resolve, reject) {
    console.log('renderTemplate invoked with:', data);

    var templateDir = path.join(__dirname, '..', 'templates', 'word-of-the-day');
    var template = new EmailTemplate(templateDir);

    template.render(data, function(err, results) {
      if(err) reject(err);
      resolve(results.html);
    });
  });

};

