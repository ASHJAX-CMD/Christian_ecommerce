const crypto = require("crypto");
const Order = require("../models/mysql/Order");

exports.webhookHandler = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const receivedSignature = req.headers["x-razorpay-signature"];

    // 🔐 Step 1: Verify signature (RAW BODY)
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(req.body)
      .digest("hex");

    if (expectedSignature !== receivedSignature) {
      console.log("❌ Invalid webhook signature");
      return res.status(400).send("Invalid signature");
    }

    // 🔄 Step 2: Convert RAW → JSON
    const body = JSON.parse(req.body.toString());

    console.log("📩 Webhook Event:", body.event);

    // 🎯 Step 3: Handle payment success
    if (body.event === "payment.captured") {
      const payment = body.payload.payment.entity;

      const razorpay_order_id = payment.order_id;
      const razorpay_payment_id = payment.id;

      // 🔍 Find order
      const order = await Order.findOne({
        where: { razorpayOrderId: razorpay_order_id },
      });

      if (!order) return res.sendStatus(200);

      // 🛑 Prevent duplicate updates
      if (order.paymentStatus === "completed") {
        return res.sendStatus(200);
      }
      const [updated] = await Order.update(
      { status: 'paid', paymentStatus: 'completed' },
      { where: { razorpayOrderId:razorpay_order_id, paymentStatus: 'pending' } }
    );

    if (updated === 0) {
      // Already processed by webhook or another verify
      return res.json({ success: true, message: "Already verified by Route_Verify" });
    }

      // 💰 Update DB
       
      order.status = "paid";
      order.paymentStatus = "completed";
      order.paymentMethod = payment.method;
      order.razorpayPaymentId = razorpay_payment_id;
      order.razorpaySignature = receivedSignature;
      await order.save();

      console.log("✅ Order updated via webhook");
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
    res.status(500).send("Server error");
  }
};