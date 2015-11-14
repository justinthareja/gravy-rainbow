var db = require('./db.js');
var getDefinition = require('./getDefinition.js');
var getFunFact = require('./getFunFact.js');

var sources = {
  // each service name has it's own template library 
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
      return db.getArchivedFacts()
        .then(getFunFact)
        .then(db.saveFact);
    }
  }

};

module.exports = function(service, template) {
  if (!sources[service]) {
    throw('Invalid service - no template model found');
  }

  if(!sources[service][template]) {
    throw('Invalid template name - cannot retreive template data');
  }

  return sources[service][template]();

};
