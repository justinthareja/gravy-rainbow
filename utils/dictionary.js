var Spooky = require('spooky');
var Promise = require('bluebird');

module.exports = function(word) {

  return new Promise(function(resolve, reject) {
    var url = 'http://merriam-webster.com/dictionary/' + word;
    var spooky = new Spooky({
      child: { transport: 'http' },
      casper: {
          logLevel: 'debug',
          verbose: true
      }
    }, function (err) {
      if (err) {
        e = new Error('Failed to initialize SpookyJS');
        e.details = err;
        reject(e);
      }
      spooky.start(url);
      spooky.then(function() {
        var word = this.fetchText('#headword.headword:first-child h1').replace(/[0-9]/g, '');
        var partOfSpeech = this.fetchText('#headword.headword:first-child .main-fl em');
        var definition = this.fetchText('#headword.headword:first-child p:first-child').split(':')[1].trim();
        var sentence = this.fetchText('.example-sentences li:first-child').replace(/<|>/g,'');
        console.log('WORD=',word);
        console.log('PARTOFSPEECH=',partOfSpeech);
        console.log('DEFINITION=', definition);
        console.log('SENTENCE=', sentence);
      });
      spooky.run();
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

