var Promise = require('bluebird');

module.exports = function () {
  return new Promise(function(resolve, reject) {
    resolve({fact: 'such a fun fact'});
  });
}