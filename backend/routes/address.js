const auth = require("../middlewares/auth");
const Address = require("../models/mysql/address");
const express = require("express");
const router = express.Router();

const createAddress = async (req, res) => {
  const t = await Address.sequelize.transaction();
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { street, city, state, zip, country, isDefault } = req.body;
    if (isDefault) {
      await Address.update(
        { isDefault: false },
        {
          where: { userId: req.user.id, isDefault: true },
          transaction: t,
        },
      );
    }

    const address = await Address.create(
      {
        userId: req.user.id,
        street,
        city,
        state,
        zip,
        country,
        isDefault: !!isDefault,
      },
      { transaction: t },
    );
    await t.commit();
    res.status(201).json({
      message: "Address created",
      address,
    });
  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("ERROR MESSAGE:", error.message);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const addresses = await Address.findAll({
      where: { userId },
    });
    console.log(addresses);
    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch addresses",
      error: error.message,
    });
  }
};

const updateAddress = async (req, res) => {
  const t = await Address.sequelize.transaction();
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const allowedFields = [
      "street",
      "city",
      "zip",
      "state",
      "country",
      "isDefault",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });
    console.log(id, userId);
    await Address.update(
      { isDefault: false },
      {
        where: { userId, isDefault: true },
        transaction: t,
      },
    );
    await Address.update(updates, {
      where: { id, userId },
      transaction: t,
    });

    const updatedAddress = await Address.findOne({
      where: { id, userId },
      transaction: t,
    });
    await t.commit();
    res.status(200).json({
      success: true,
      address: updatedAddress,
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json({
      success: false,

      error: error.message,
      message: "Failed to update",
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    console.log("Deleting address:", {
      id: Number(id),
      userId: Number(userId),
    });
    const deleted = await Address.destroy({
      where: { id: Number(id), userId: Number(userId) },
    });
    console.log("Deleted result:", deleted);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Address not Found !",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was an error cant delete",
      error: error.message,
    });
  }
};
router.post("/", auth, createAddress);
router.get("/fetchAddresses", auth, getUserAddresses);
router.put("/:id", auth, updateAddress);
router.delete("/:id", auth, deleteAddress);
module.exports = router;
