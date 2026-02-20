const { DataTypes } = require("sequelize");
const {sequelize} = require("../../db/mysql");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {type:DataTypes.STRING,allowNull:true}
});

module.exports = User;
