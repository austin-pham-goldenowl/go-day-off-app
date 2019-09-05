const path = require("path");
const Sequelize = require("sequelize");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.resolve(process.cwd(), ".env.dev") }); // eslint-disable-line
}

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? process.env.DB_PORT : '',
    host: process.env.SERVER_HOST_ADDRESS || "127.0.0.1",
    dialect: process.env.DIALECT || "mysql",
    operatorsAliases: Sequelize.Op,
    dialectOptions: {
      ssl: process.env.DB_SSL || false
    }
  },
  production: {
    use_env_variable: "CLEARDB_DATABASE_URL",
    CLEARDB_DATABASE_URL: process.env.CLEARDB_DATABASE_URL,
  }
};
