module.exports = {
    HOST: process.env.POSTGRESQL_DB_HOST,
    USER: process.env.POSTGRESQL_DB_USER,
    PASSWORD: process.env.POSTGRESQL_DB_PASSWORD,
    PORT: process.env.POSTGRESQL_DB_PORT,
    DB: process.env.POSTGRESQL_DB,

    // logging : false,
    dialect: "postgres",
  //   pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // },
  };

