const jwt = require('express-jwt');
const config = require('../config');
const adminOnly = require('../middlewares/adminOnly');

const jwtAuth = jwt({
  secret: config.jwtSecret
});

module.exports = function(app) {
  // Public route
  app.use('/api/auth', require('./auth.route'));

  // Protected routes
  app.use('/api/todo', jwtAuth, require('./todo.route'));

  // Admin routes
  app.use('/api/admin', jwtAuth, adminOnly, require('./admin.route'));
};
