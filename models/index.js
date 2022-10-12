const pg = require("pg")
pg.defaults.ssl =true;
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
  dialectOptions:{
    ssl:{
      require:true,
      rejectUnauthorized:false
    }
  }
  // pool: {
  //   max: dbConfig.pool.max,
  //   min: dbConfig.pool.min,
  //   acquire: dbConfig.pool.acquire,
  //   idle: dbConfig.pool.idle
  // }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.post = require("./post.model")(sequelize, Sequelize);
//db.post = require("./post.model")(sequelize, Sequelize);

// db.user.hasMany(db.post, { as: 'post' });
// db.post.belongsTo(db.user, {
//   foreignKey: 'user_id',
//   as: 'user',
// });
module.exports = db;