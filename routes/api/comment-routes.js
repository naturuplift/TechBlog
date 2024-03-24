
const router = require('express').Router();
const { Comment } = require('../../models');
const authenticateToken = require('../../middleware/authMiddleware');

// Get all comments for a blog post
router.get('/comments/:postId', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { postId: req.params.postId }
        });
        res.json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a comment to a blog post
router.post('/comments', authenticateToken, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.user.id // Assuming req.user is set by authenticateToken middleware
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a comment
router.delete('/comments/:id', authenticateToken, async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id;
        
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: "No comment found with this ID" });
        }

        if (comment.userId !== userId) {
            return res.status(403).json({ message: "You're not authorized to delete this comment" });
        }

        // Delete the comment
        await Comment.destroy({
            where: {
                id: commentId,
                userId: userId
            }
        });

        res.json({ message: 'Comment deleted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
