const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const {verifyPayment} = require("../controllers/createPaymentOrder")
const { createPaymentOrder } = require("../controllers/createPaymentOrder");
const { webhookHandler } = require("../controllers/webhook");
router.post("/create-order", auth, createPaymentOrder);
router.post("/verify", auth, verifyPayment);

const { refundController } = require("../controllers/refundController");
router.post("/verify/refund/:id", refundController)
// IMPORTANT: use RAW, not JSON
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);


module.exports = router;
