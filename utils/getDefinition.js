var Spooky = require('spooky');
var Promise = require('bluebird');

module.exports = function(word) {

  return new Promise(function(resolve, reject) {
    var options = {
      url: 'http://www.merriam-webster.com/dictionary/' + word
    };
    var spooky = new Spooky({
      child: { transport: 'http' },
      casper: {
        logLevel: 'info',
        verbose: true
      }
    }, function (err) {
      if (err) {
        e = new Error('Failed to initialize SpookyJS');
        e.details = err;
        reject(e);
      }
      spooky.start(options.url);
      spooky.then([options, extendWord]);
      spooky.run();
    });

    spooky.on('complete', function(word){
      resolve(word);
    });

    spooky.on('error', function (e, stack) {
      if (stack) {
        e.stack = stack;
      }
      reject(e);
    });

    spooky.on('console', function (line) {
      console.log(line);
    });

    spooky.on('log', function (log) {
      if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
      }
    });
  });

};

// This function is run in the casper context
function extendWord() {
  // Make sure spooky made it to the expected url
  if (this.getCurrentUrl() !== url) {
    this.emit('error', 'DICTIONARY: Error resolving word url');
    return;
  }

  // Extend word with part of speech, definition, and sentence
  var result = {};
  result.word = this.fetchText('#headword.headword:first-child h1').replace(/[0-9]/g, '');
  result.partOfSpeech = this.fetchText('#headword.headword:first-child .main-fl em');
  result.sentence = this.fetchText('.example-sentences li:first-child').replace(/<|>/g,'');
  result.url = this.getCurrentUrl();
  
  result.definition = this.fetchText('#headword.headword:first-child p:first-child').replace(/:|-/g, '') ||
    this.evaluate(function() {
      return document.querySelector('.ssens').textContent.replace(/:|-/g, '');
    });

  // Make sure all the necessary properties were found 
  if(!result.word) {
    this.emit('error', 'DICTIONARY: Error getting word from merriam-webster');
  } else if(!result.partOfSpeech) {
    this.emit('error', 'DICTIONARY: Error getting part of speech from merriam-webster');
  } else if(!result.definition) {
    this.emit('error', 'DICTIONARY: Error getting definition from merriam-webster');
  } else if(!result.sentence) {
    this.emit('info', 'DICTIONARY: No sentence found from merriam-webster');
  } else {
    // Pass result to node context
    this.emit('complete', result);
  }
}

