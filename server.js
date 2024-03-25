// Include packages needed for this application
const express = require('express');
// Import session package for storing client's data in a cookie
const session = require('express-session');
// import sequelize connection
const sequelize = require('./config/connection');
// Import the connect-session-sequelize package for storing sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Imports the routing files from ./controllers directory
const routes = require('./controllers');
// Import Handlebars.js package for dynamically creating HTML
const exphbs = require('express-handlebars');

require('dotenv').config();
const helpers = require('./utils/formatDate');
// Import path module for working with directories
const path = require('path');

// initializes a new instance of the Express application
const app = express();
// set port the server will listen to
const PORT = process.env.PORT || 3003;

// Set up session
const sess = {
	secret: process.env.ACCESS_TOKEN_SECRET,
	cookie: {
		// 10 minute session before user logout
		maxAge: 3600000,
		httpOnly: true,
		secure: false,
		sameSite: 'strict',
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));
// middleware
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express app to recognize incoming requests as JSON objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware for automatically serving static assets when root URL is accessed
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Sorry, something broke!');
});

// sync sequelize models to database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
  });
});