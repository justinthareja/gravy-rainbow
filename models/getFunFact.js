var Spooky = require('spooky');
var Promise = require('bluebird');
var config = require('../config.js');

module.exports = function() {

  return new Promise(function(resolve, reject) {
    var options = {
      url: config.funFactUrl
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
      spooky.then([options, getFact]);
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
function getFact() {
  // Make sure spooky made it to the expected url
  if (this.getCurrentUrl() !== url) {
    this.emit('error', 'FUN FACT: Error resolving fun fact url');
    return;
  }

  var result = this.evaluate(function() {
    var post = document.querySelector('#siteTable div .title a');
    return {
      fact: post.textContent,
      url: post.getAttribute('href')
    };
  });

  if (!result.fact) {
    this.emit('error', 'FUN FACT: Error no fact found');
  } else if (!result.url) {
    this.emit('error', 'FUN FACT: Error no link to fact found');
  } else {
    // Pass result to node context
    this.emit('complete', result);
  }

}

