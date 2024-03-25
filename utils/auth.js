// Authentication middleware
const withAuth = (req, res, next) => {
    // If user is not logged in, redirect request to login route
    if(!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

// making it available for use in app
module.exports = withAuth;