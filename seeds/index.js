// Import Sequelize connection and all seed files
const sequelize = require('../config/connection');
const seedUsers = require('./users-seeds');
const seedBlogPosts = require('./blogpost-seeds');
const seedComments = require('./comment-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
    // Call each seed function sequentially to populate database tables
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedBlogPosts();
  console.log('\n----- BLOG POSTS SEEDED -----\n');

  await seedComments();
  console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};
// Execute the seedAll function to start the seeding process
seedAll();