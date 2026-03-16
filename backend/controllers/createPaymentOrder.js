const razorpay = require("../middlewares/razorpay");
const Order = require("../models/mysql/Order");

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