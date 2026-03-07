const { DataTypes } = require("sequelize");
const {sequelize} = require("../../db/mysql");
const User = require("../mysql/User");
const Address = require("../mysql/address");


const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("pending", "paid", "shipped", "delivered", "cancelled"),
    defaultValue: "pending",
  },

  paymentMethod: {
    type: DataTypes.STRING,
  },

  paymentStatus: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    defaultValue: "pending",
  },
});

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Address.hasMany(Order, { foreignKey: "addressId" });
Order.belongsTo(Address, { foreignKey: "addressId" });

module.exports = Order;
