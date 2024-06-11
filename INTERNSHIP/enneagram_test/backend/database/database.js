const { Sequelize } = require("sequelize");
const config = require("../config/config.json"); // Adjust the path as needed

const sequelize = new Sequelize(
  config[process.env.NODE_ENV || "development"].database,
  config[process.env.NODE_ENV || "development"].username,
  config[process.env.NODE_ENV || "development"].password,
  {
    logging: false,
    host: config[process.env.NODE_ENV || "development"].host,
    port: config[process.env.NODE_ENV || "development"].port,
    dialect: config[process.env.NODE_ENV || "development"].dialect,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
