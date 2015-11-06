var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
// Execute job once every day of the week at 0800 hours
rule.dayOfWeek = new schedule.Range(0, 6);
rule.hour = 8;
rule.minute = 0;
// rule.second = new schedule.Range(0,59);

module.exports = {

  initialize: function () {
    var job = schedule.scheduleJob(rule, function() {
      // TODO: send email --- maybe a request to its own endpoint
      console.log('hello from the job run callback');
    });

    job.on('run', function() {
      console.log('Emails sent at:', new Date());
    });
  }

};



