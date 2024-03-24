// Include packages needed for this application
// Import the Router function from the express package
const router = require('express').Router();

// Routes
const apiRoutes = require('./api');
// const homeRoutes = require('./home-route.js');
 
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// Catch-all route for any requests not handled by the defined routes
router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
  });
  
  // Export the router to make it available for use
  module.exports = router;