// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// include bcrypt package
const bcrypt = require('bcrypt');
// import database connection from config
const sequelize = require('../config/connection');

// Initialize User model by extending Sequelize's Model class
class User extends Model {
  // Method to compare entered password with hashed password in database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Set up fields and rules for User model for PostgreSQL
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      // Hash password before saving a new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Hash password before updating a user's password
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// User exported making it available for use in the app
module.exports = User;