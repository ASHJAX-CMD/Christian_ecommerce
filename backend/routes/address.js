const auth = require("../middlewares/auth");
const Address = require("../models/mysql/address")
const express = require("express");
const router = express.Router();

const createAddress = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { street, city, state, zip, country, isDefault } = req.body;

    const address = await Address.create({
      userId: req.user.id,
      street,
      city,
      state,
      zip,
      country,
      isDefault
    });

    res.status(201).json({
      message: "Address created",
      address
    });

  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("ERROR MESSAGE:", error.message);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.id; // comes from JWT middleware

    const addresses = await Address.findAll({
      where: { userId }
    });

    res.status(200).json({
      success: true,
      addresses
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch addresses",
      error: error.message
    });
  }
};
router.post("/", auth, createAddress);
router.get("/getAddress", auth, getUserAddresses    );

module.exports = router;
