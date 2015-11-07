var schedule = require('node-schedule');
var request = require('request');

// Execute job once every day of the week at 0730 hours
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(0, 6);
rule.hour = 7;
rule.minute = 30;

module.exports = {

  initialize: function () {
    console.log('SCHEDULER: email schedule set', rule);
    var job = schedule.scheduleJob(rule, function() {
      // The email execution chain is handled by a get request to '/email';
      request({
        url: 'http://localhost:1337/email',
        json: true
      }, function(err, response) {
        if (err) {
          job.cancel(); // Cancel the job if there's an error thrown
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