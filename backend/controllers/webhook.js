const Order = require("../models/mysql/Order");
const crypto = require("crypto");

exports.webhookHandler = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const receivedSignature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(req.body)
      .digest("hex");

    if (expectedSignature !== receivedSignature) {
      console.log("❌ Invalid webhook signature");
      return res.status(400).send("Invalid signature");
    }

    const body = JSON.parse(req.body.toString());
    console.log("📩 Webhook Event:", body.event);

    // ✅ PAYMENT SUCCESS
    if (body.event === "payment.captured") {
      const payment = body.payload.payment.entity;

      const order = await Order.findOne({
        where: { razorpayOrderId: payment.order_id },
      });

      if (!order) return res.sendStatus(200);

      console.log("Current Payment Status Razorpay:", payment.status);

      if (order.paymentStatus === "completed") {
        return res.sendStatus(200);
      }

      await Order.update(
        {
          status: "placed",
          paymentStatus: "completed",
          paymentMethod: payment.method,
          razorpayPaymentId: payment.id,
          razorpaySignature: receivedSignature,
        },
        {
          where: {
            razorpayOrderId: payment.order_id,
            paymentStatus: "pending",
          },
        }
      );

      console.log("✅ Order updated via webhook");
    }

    // ❌ PAYMENT FAILED
    if (body.event === "payment.failed") {
      const payment = body.payload.payment.entity;

      console.log("❌ Payment failed");

      await Order.update(
        { paymentStatus: "failed" },
        { where: { razorpayOrderId: payment.order_id } }
      );
    }

    return res.status(200).json({ message: "Webhook processed" });

  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
    return res.status(500).send("Server error");
  }
};