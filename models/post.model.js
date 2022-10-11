
const { DataTypes } = require("sequelize");


module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    title: {
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

  return Post;
};

