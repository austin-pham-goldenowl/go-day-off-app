const path = require("path");
const Sequelize = require("sequelize");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.resolve(process.cwd(), ".env") }); // eslint-disable-line
}

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.SERVER_HOST_ADDRESS || "127.0.0.1",
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
