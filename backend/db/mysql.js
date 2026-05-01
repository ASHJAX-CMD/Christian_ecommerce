const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,

  {
    host: "mysql",
    port: 3306,
    dialect: "mysql",
    logging: console.log,
  },
);

const testConnection = async () => {
  while (true) {
    try {
      await sequelize.authenticate();
      console.log("MySQL connected ✅");
      return;
    } catch (err) {
      console.error("MySQL connection error:", err.message);
      console.log("MySQL not ready, retrying...");
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};
module.exports = { sequelize, testConnection };
