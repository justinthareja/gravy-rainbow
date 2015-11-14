var Spooky = require('spooky');
var Promise = require('bluebird');
var config = require('../config.js');

module.exports = function(archives) {
  archives = archives.map(function(archive) {
    return archive.fact;
  });

  return new Promise(function(resolve, reject) {
    var options = {
      url: config.funFactUrl,
      archives: archives
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

  var results = this.evaluate(function() {
    var containers = [].slice.call(document.querySelectorAll('#siteTable div.thing.link'));
    return containers.map(function(container) {
      var post = container.querySelector('.title a');
      return {
        fact: post.textContent,
        url: post.getAttribute('href')
      };
    });
  });

  var result = results.filter(function(result) {
    return archives.indexOf(result.fact) === -1;
  })[0];


  if (!result.fact) {
    this.emit('error', 'FUN FACT: Error no fact found');
  } else if (!result.url) {
    this.emit('error', 'FUN FACT: Error no link to fact found');
  } else {
    // Pass result to node context
    this.emit('complete', result);
  }

}

