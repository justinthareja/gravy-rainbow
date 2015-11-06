var schedule = require('node-schedule');
var request = require('request');
var host = process.env.HOST || 'http://localhost:1337';
var url = host + '/email';

var rule = new schedule.RecurrenceRule();
// Execute job once every day of the week at 0800 hours
rule.dayOfWeek = new schedule.Range(0, 6);
// rule.hour = 8;
// rule.minute = 0;
// rule.second = 30;

module.exports = {

  initialize: function () {
    console.log('SCHEDULER: email schedule set');
    var job = schedule.scheduleJob(rule, function() {
      request({
        url: url,
        json: true
      }, function(err, response, body) {
        if (err) console.log(err);
        console.log('SCHEDULER: email sent to mailgun');
        console.log('SCHEDULER: confirmation id:', body.id);
        console.log('SCHEDULER: message from mailgun:', body.message);
      });
    });

  }

};



