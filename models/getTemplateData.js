var db = require('./db.js');
var getDefinition = require('./dictionary.js');
var getFunFact = require('./getFunFact.js');

var sources = {
  // each service name has it's own template library within sources
  gre: {
    dailyVocabWord: function() {
      return db.getDailyWord().then(getDefinition);
    },
    weeklySummary: function() {
      // TODO:
    }
  },

  funFact: {
    dailyFact: function() {
      return getFunFact();
    }
  }

};

module.exports = function(service, template) {

  return sources[service][template]();

};