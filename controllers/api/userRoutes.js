// Import Router from express and models from the database
const router = require('express').Router();
// Import Users model from the models directory
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const authenticateSession = require('../../utils/auth');

// User login route
router.post('/login',  async (req, res) => {
    console.log(req.body);
    
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Generate token
            req.session.save(() => {
                req.session.user_id = user.id;
                req.session.logged_in = true;
                res.status(200).json(user);
		    });
        } else {
            res.status(400).send('Invalid Credentials');
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// Export the router to make these routes available
module.exports = router;