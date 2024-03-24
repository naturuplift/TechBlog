// Import the BlogPost model from the sequelize models
const { BlogPost } = require('../models');

// Array containing seed data for BlogPost
const blogpostData = [
  {
    title: 'Why MVC is so important',
    content: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
    userId: 1
  },
  {
    title: 'Authentication vs. Authorization',
    content: 'While both authentication and authorization offer ways to protect your application, they serve two different purposes. Authentication confirms that users are who they say they are. Authorization gives those users permission to access a resource.',
    userId: 2
  }
];

// Function to seed BlogPost data into the database
const seedBlogPosts = () => BlogPost.bulkCreate(blogpostData);

// Export the seed function for use in the seeding script
module.exports = seedBlogPosts;