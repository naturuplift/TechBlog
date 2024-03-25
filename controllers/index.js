// Include packages needed for this application
// Import the Router function from the express package
const router = require('express').Router();
// Routes path contains /api, go to api folder
const apiRoutes = require('./api'); 
router.use('/api', apiRoutes);

const homeRouteRoutes = require('./homepageRoutes');
router.use('/', homeRouteRoutes);
// router.use('/', homeRouteRoutes);
  
// Export the router to make it available for use
module.exports = router;