const razorpay = require("../middlewares/razorpay");
const crypto = require("crypto");
const supabase = require("../config/supabase");
exports.createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    //  Step 1: Fetch order from Supabase
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (fetchError || !order) {
      return res.status(404).json({ message: "Order not found" });
    }
  //  Step 2: Create Razorpay order
    const options = {
      amount: order.total * 100,
      currency: "INR",
      receipt: `order_${order.id}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

     //  Step 3: Save razorpayOrderId in Supabase
    const { error: updateError } = await supabase
      .from("orders")
      .update({ razorpay_order_id: razorpayOrder.id })
      .eq("id", orderId);

    if (updateError) throw updateError;

    //  Step 4: Return response
    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });

  } catch (error) {
    console.error("Payment order error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    console.log("VERIFY HIT:", {
      razorpay_payment_id,
      razorpay_order_id,
    });
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      console.log("❌ CANCELLED PAYMENT HIT BACKEND");

      return res.status(400).json({
        success: false,
        message: "Payment cancelled",
      });
    }
    //  Step 1: Create expected signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    //  Step 2: Compare signatures
    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

       //  Step 2: Fetch order from Supabase
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("razorpay_order_id", razorpay_order_id)
      .single();

    if (fetchError || !order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Already handled
    if (order.payment_status === "completed") {
      return res.json({
        success: true,
        message: "Already verified by WebHook",
      });
    }
  //  Step 3: Fetch payment from Razorpay
    let payment;

    try {
      payment = await razorpay.payments.fetch(razorpay_payment_id);
      console.log(payment.status);
    } catch (err) {
      console.log("❌ INVALID PAYMENT ID");

      return res.status(400).json({
        success: false,
        message: "Invalid payment",
      });
    }
    if (payment.amount !== order.total * 100) {
      return res.status(400).json({
        success: false,
        message: "Amount mismatch",
      });
    }
    if (payment.order_id !== razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Order mismatch",
      });
    }
    if (payment.status !== "captured") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    if (order.paymentStatus === "completed") {
      // Already processed by webhook or another verify
      return res.json({
        success: true,
        message: "Already verified by WebHook",
      });
    }
 
    console.log("Payment Verified Waiting for WebHook");
    res.json({ success: true, message: "Waiting for WebHook" });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
