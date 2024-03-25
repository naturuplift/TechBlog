// Import Router from express and models from the database
const router = require('express').Router();
// Import BlogPost, User model from the models directory
const { Comment, BlogPost, User } = require('../models');
// Import Authentication Middleware
const authenticateSession = require('../utils/auth');

// Display homepage and show all blog posts
router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [{ model: User, attributes: ['username'] }]
        });

        // Serialise blogPostData for handlebars use
		const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
			blogPosts,
			loggedIn: req.session.loggedIn,
		});
    } catch (err) {
        res.status(500).json(err);
    }
});

// Export the configured router to be used by the main application
module.exports = router;