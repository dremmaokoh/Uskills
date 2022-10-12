
const { DataTypes } = require("sequelize");


module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    comment: {
      type: Sequelize.STRING,
       allowNull: false,
    },
    body: {
      type: Sequelize.STRING,
       allowNull: false,
    },
     attachment: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    }
  },
    {
      tablenName: 'Posts',
      timestamps: true
    
  });

  return Comment;
};

