const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
  id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
     githubId: {
            type: Sequelize.STRING,
          },
name: {
  type: Sequelize.STRING,
  allowNull: false
},
username: {
  type: Sequelize.STRING,
  allowNull: false
},
   role: {
    type: Sequelize.STRING,
    enumerable: ['user', 'admin'],
    defaultValue: 'user',
    allowNull: true,
  },},
  {
    tableName: 'User',
    timestamps: true

    })
    return User;
  };