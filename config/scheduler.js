var schedule = require('node-schedule');
var request = require('request');

var rule = new schedule.RecurrenceRule();
// Execute job once every day of the week at 0730 hours
rule.dayOfWeek = new schedule.Range(0, 6);
rule.hour = 7;
rule.minute = 30;

module.exports = {

  initialize: function () {
    console.log('SCHEDULER: email schedule set', rule);
    var job = schedule.scheduleJob(rule, function() {
      request({
        url: 'http://localhost:1337/email',
        json: true
      }, function(err, response) {
        if (err) {
          job.cancel();
          throw(err);
        }
        console.log('SCHEDULER: email sent to mailgun', response.body);
      });
    });

    job.on('canceled', function() {
      console.log('SCHEDULER: error sending email, cancelling schedule');
    });
  }

};