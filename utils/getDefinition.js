var Spooky = require('spooky');
var Promise = require('bluebird');

module.exports = function(word) {

  return new Promise(function(resolve, reject) {
    var url = 'http://merriam-webster.com/dictionary/' + word;
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
      spooky.start(url);
      spooky.then(function() {
        var result = {};

        result.name = this.fetchText('#headword.headword:first-child h1').replace(/[0-9]/g, '');
        result.partOfSpeech = this.fetchText('#headword.headword:first-child .main-fl em');
        result.definition = this.fetchText('#headword.headword:first-child p:first-child').replace(/:|-/g, '');
        result.sentence = this.fetchText('.example-sentences li:first-child').replace(/<|>/g,'');

        this.emit('complete', result);
      });
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

