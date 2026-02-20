const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/mysql/User");
const Order = require("../models/mysql/Order");
const auth = require("../middlewares/auth");

const router = express.Router();

// ----------------------
// REGISTER
// ----------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    
    if (existing) return res.status(400).json({ message: "Email already in use" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashed });

    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------
// LOGIN
// ----------------------
// login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);
    const user = await User.findOne({ where: { email } });
     
     console.log("User found:", user);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
     
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });
    console.log("Password match:", valid);

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send HttpOnly cookie
    res
    .cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      secure:false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
    success: true,
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });

    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me",auth, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});
// ----------------------
// GET LOGGED-IN USER PROFILE
// ----------------------
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role"], // exclude password
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------
// GET LOGGED-IN USER ORDERS
// ----------------------
// router.get("/orders", auth, async (req, res) => {
//   try {
//     const orders = await Order.findAll({
//       where: { UserId: req.user.id },
//       order: [["createdAt", "DESC"]],
//     });
//     res.json(orders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// ----------------------
// CREATE ORDER (LOGGED-IN USER)
// ----------------------
// router.post("/orders", auth, async (req, res) => {
//   try {
//     const { total } = req.body;
//     const order = await Order.create({
//       total,
//       UserId: req.user.id,
//     });
//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;
