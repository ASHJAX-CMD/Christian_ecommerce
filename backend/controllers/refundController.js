const Razorpay = require("razorpay");

const razorpay = require("../middlewares/razorpay");
const Order = require("../models/mysql/Order");
const refundController = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find order
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 2. Validate payment
    if (order.paymentStatus === "pending") {
      return res.status(400).json({
        message: "Only paid orders can be refunded",
      });
    }

    // 3. Prevent duplicate refund
    if (order.paymentStatus === "refunded") {
      return res.status(400).json({
        message: "Order already refunded",
      });
    }

    
   

    // 5. Call refund API
    const refund = await razorpay.payments.refund(
      order.razorpayPaymentId,
      {
        amount: order.total * 100, // convert to paise
      }
    );

    // 6. Update DB  done in webhook
    // order.paymentStatus = "refunded";
    // order.refundId = refund.id;
    // order.refundedAt = new Date();

    // await order.save();

    // 7. Send response
    res.json({
      success: true,
      message: "Refund Confirmed from RfundController now transfering Control to Webhook",
      refundId: refund.id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Refund failed",
      error: err.message,
    });
  }
};

module.exports = { refundController }; 
