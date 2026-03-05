const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/mysql");
const Order = require("./Order");

const OrderItem = sequelize.define("OrderItem", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  productId: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

Order.hasMany(OrderItem, { 
  foreignKey: "orderId",
  as: "items"
});

OrderItem.belongsTo(Order, { 
  foreignKey: "orderId"
});

module.exports = OrderItem;
