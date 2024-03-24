// Import Router from express and models from the database
const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../../middleware/authMiddleware');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashedPassword
        });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Generate token
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ jwt: token });
        } else {
            res.status(400).send('Invalid Credentials');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update user information
router.put('/update', authenticateToken, async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.update({
            username,
            password: hashedPassword
        }, {
            where: { id: req.user.id }
        });
        if (updatedUser) {
            res.send('User updated successfully.');
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
