// Import the Comment model from the sequelize models
const { Comment } = require('../models');

// Array containing seed data for Comment
const commentData = [
  {
    content: 'Really interesting read!',
    userId: 2,
    blogPostId: 1
  },
  {
    content: 'This makes so much sense. Thanks for sharing!',
    userId: 1,
    blogPostId: 2
  }
];

// Function to seed Comment data into the database
const seedComments = () => Comment.bulkCreate(commentData);

// Export the seed function for use in the seeding script
module.exports = seedComments;