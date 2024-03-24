// Import the User model from the sequelize models
const { User } = require('../models');

// Array containing seed data for users
const userData = [
  {
    username: 'johnDoe',
    password: 'password123'
  },
  {
    username: 'janeDoe',
    password: 'password123'
  }
];

// Function to seed users data into the database
const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

// Export the seed function for use in the seeding script
module.exports = seedUsers;