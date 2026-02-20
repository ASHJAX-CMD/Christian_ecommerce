const { DataTypes } = require("sequelize");
const {sequelize} = require("../../db/mysql");
const User = require("../mysql/User");

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  total: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
});

User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;
