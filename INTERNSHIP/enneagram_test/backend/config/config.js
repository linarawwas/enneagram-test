const dotenv = require("dotenv");
dotenv.config();
const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_SERVER,
  dialect: process.env.DIALECT,
  port: process.env.DB_PORT,
  migrationStorageTableName: "migrations",

};

module.exports = development;
