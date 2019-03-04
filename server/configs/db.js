const path = require("path");
const Sequelize = require("sequelize");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.resolve(process.cwd(), ".env") }); // eslint-disable-line
}

module.exports = {
  development: {
    username: process.env.SERVER_HOST_USER,
    password: process.env.SERVER_HOST_PWD,
    database: process.env.SERVER_HOST_DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DIALECT || "mysql",
    operatorsAliases: Sequelize.Op,
    dialectOptions: {
      ssl: process.env.DB_SSL || false
    }
  },
  production: {
    use_env_variable: "DATABASE_URL",
    DATABASE_URL: process.env.DATABASE_URL
  }
};
