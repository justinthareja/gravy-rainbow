var controller = require('../controllers/controllers.js');

module.exports = function(app) {

  // The big show. 
  app.get('/email/:template', controller.sendEmail);
  // The big show minus the actual email part
  app.get('/test/email/:template', controller.sendTestEmail);

  // Basic db queries
  app.get('/users', controller.getAllUsers);
  app.post('/users/create', controller.createNewUser);
  app.get('/words/weekly', controller.getWeeklySummary);
  
};
