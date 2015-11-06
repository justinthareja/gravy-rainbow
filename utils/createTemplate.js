var Promise = require('bluebird');

module.exports = function (word) {

  return '<h1 style="display:inline-block">' + word.name + '   </h1>' +
    '<h3 style="display:inline-block"><i>(' + word.partOfSpeech + ')</i></h3>' +
    '<p><strong>Definition: </strong>' + word.definition + '</p>' +
    '<p>"' + word.sentence + '"</p>';
    
};

