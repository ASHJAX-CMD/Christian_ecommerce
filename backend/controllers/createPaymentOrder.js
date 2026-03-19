const razorpay = require("../middlewares/razorpay");
const Order = require("../models/mysql/Order");
const crypto = require("crypto");
exports.createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const options = {
      amount: order.total * 100,
      currency: "INR",
      receipt: `order_${order.id}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    order.razorpayOrderId = razorpayOrder.id;

    await order.save();

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    // 🔐 Step 1: Create expected signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // 🔍 Step 2: Compare signatures
    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // ✅ Step 3: Update DB (VERY IMPORTANT)
    const order = await Order.findOne({
      where: { razorpayOrderId: razorpay_order_id },
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.paymentStatus === "completed") {
      return res.json({ success: true, message: "Already verified by webHook" });
    }
    const [updated] = await Order.update(
      { status: "paid", paymentStatus: "completed" },
      { where: { razorpayOrderId:razorpay_order_id, paymentStatus: "pending" } },
    );

    if (updated === 0) {
      // Already processed by webhook or another verify
      return res.json({
        success: true,
        message: "Already verified by WebHook",
      });
    }
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.amount !== order.total * 100) {
      return res.status(400).json({
        success: false,
        message: "Amount mismatch",
      });
    }
    if (payment.status !== "captured") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    order.status = "paid";
    order.paymentStatus = "completed";
    order.paymentMethod = payment.method;
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    await order.save();
    console.log("written by Verify");
    res.json({ success: true });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
