var Promise = require('bluebird');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');

// Takes a data object that is passed to the handlebars template
// Resolves with a compiled html string
module.exports = function(data) {
  
  return new Promise(function(resolve, reject) {

    var templateDir = path.join(__dirname, '..', 'templates', 'wordOfTheDay');
    var template = new EmailTemplate(templateDir);

    template.render(data, function(err, results) {
      if(err) reject(err);
      resolve(results.html);
    });
  });

};

