// Import Router from express and models from the database
const router = require('express').Router();
// Import BlogPost, User model from the models directory
const { BlogPost, User } = require('../../models');
// Import Authentication Middleware
const authenticateToken = require('../../middleware/authMiddleware');

// Get all blog posts
router.get('/blogposts', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [{ model: User, attributes: ['username'] }]
        });
        res.json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a new blog post
router.post('/blogposts', authenticateToken, async (req, res) => {
    try {
        const newPost = await BlogPost.create({
            ...req.body,
            userId: req.user.id
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a blog post
router.put('/blogposts/:id', authenticateToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        const blogPostId = req.params.id;
        const userId = req.user.id;

        // Update the blog post
        const [updatedRows] = await BlogPost.update({ title, content }, {
            where: {
                id: blogPostId,
                userId: userId
            }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: "No blog post found with this ID" });
        }

        res.json({ message: 'Blog post updated successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete a blog post
router.delete('/blogposts/:id', authenticateToken, async (req, res) => {
    try {
        const blogPostId = req.params.id;
        const userId = req.user.id;

        // Delete the blog post
        const deletedRows = await BlogPost.destroy({
            where: {
                id: blogPostId,
                userId: userId
            }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: "No blog post found with this ID" });
        }

        res.json({ message: 'Blog post deleted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
