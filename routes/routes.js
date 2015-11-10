var controller = require('../controllers/controllers.js');

module.exports = function(app) {

  // The big show. 
  app.get('/email/:service/:template', controller.sendEmail);
  // The big show minus the actual email part
  app.get('/test/:service/:template', controller.sendTestEmail);

  // Basic db queries
  app.get('/users/:service', controller.getAllUsers);
  app.post('/users/:service/create', controller.createNewUser);
  app.get('/words/weekly', controller.getWeeklySummary);
  
};
