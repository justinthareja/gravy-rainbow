var controller = require('../controllers/controllers.js');

module.exports = function(app) {

  // The big show.
  app.get('/email/:service/:template', controller.sendEmail);
  app.get('/test/:service/:template', controller.sendTest);

  // Basic db queries sorted by service
  app.get('/users/:service', controller.getAllUsers);
  app.post('/users/:service/create', controller.createNewUser);
  
  
};
