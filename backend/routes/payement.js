const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

const { createPaymentOrder } = require("../controllers/createPaymentOrder");

router.post("/create-order", auth, createPaymentOrder);

module.exports = router;