// Import Router from express to handle route definitions
const router = require('express').Router();

// Import routes for models
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const blogpostRoutes = require('./blogpost-routes');

// Register routes to be served under own paths
router.use('/', userRoutes);
router.use('/', commentRoutes);
router.use('/', blogpostRoutes);

// Export the configured router to be used by the main application
module.exports = router;