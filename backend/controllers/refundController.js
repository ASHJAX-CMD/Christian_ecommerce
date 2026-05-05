const razorpay = require("../middlewares/razorpay");
const supabase = require("../config/supabase");

const refundController = async (req, res) => {
  try {
    const { id } = req.params;

    //  Step 1: Fetch order from Supabase
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !order) {
      return res.status(404).json({ message: "Order not found" });
    }

    
    // prevent users refunding others’ orders
    if (req.user.role !== "admin" && order.user_id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    //  Step 2: Validate payment
    if (order.payment_status === "pending") {
      return res.status(400).json({
        message: "Only paid orders can be refunded",
      });
    }

    // Step 3: Prevent duplicate refund
    if (order.payment_status === "refunded") {
      return res.status(400).json({
        message: "Order already refunded",
      });
    }

    //  Safety check
    if (!order.razorpay_payment_id) {
      return res.status(400).json({
        message: "No payment ID found for refund",
      });
    }

    //  Step 4: Call Razorpay refund API
    const refund = await razorpay.payments.refund(
      order.razorpay_payment_id,
      {
        amount: order.total * 100, // paisa
      }
    );

    //  webhook handles DB update → good
    // So DO NOT update DB here

    res.json({
      success: true,
      message:
        "Refund initiated. Webhook will finalize status.",
      refundId: refund.id,
    });

  } catch (err) {
    console.error("REFUND ERROR:", err);
    res.status(500).json({
      message: "Refund failed",
      error: err.message,
    });
  }
};

module.exports = { refundController };