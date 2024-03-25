// Import Router from express to handle route definitions
const router = require('express').Router();

// Import routes for models
const userRoutes = require('./userRoutes');
// const blogPostRoutes = require('./blogPostRoutes');
// const commentRoutes = require('./commentRoutes');

// Register routes to be served under own paths
router.use('/user', userRoutes);
// router.use('/post', blogPostRoutes);
// router.use('/comment', commentRoutes);

// Export the configured router to be used by the main application
module.exports = router;