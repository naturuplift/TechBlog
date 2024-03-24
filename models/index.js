// Import models
const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// Define model associations for PostgreSQL
User.hasMany(BlogPost, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'userId'
});

BlogPost.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'postId'
});

Comment.belongsTo(User, {
    foreignKey: 'userId'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

// Export the models and their associations
module.exports = {
    User,
    BlogPost,
    Comment
};