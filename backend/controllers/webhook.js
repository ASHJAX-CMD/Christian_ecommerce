const crypto = require("crypto");
const { getIO } = require("../config/socket");

const Product = require("../models/mongodb/Product");
const supabase = require("../config/supabase");
exports.webhookHandler = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const receivedSignature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(req.body)
      .digest("hex");

    if (expectedSignature !== receivedSignature) {
      console.log(" Invalid webhook signature");
      return res.status(400).send("Invalid signature");
    }

    const body = JSON.parse(req.body.toString());
    console.log("📩 Webhook Event:", body.event);

    /* ======================================================
        REFUND PROCESSED
    ====================================================== */
    if (body.event === "refund.processed") {
      const refund = body.payload.refund.entity;

      console.log("💸 Refund processed:", refund.id);

      const { error } = await supabase
        .from("orders")
        .update({
          payment_status: "refunded",
          status: "cancelled",
          refund_id: refund.id,
          refunded_at: new Date(),
        })
        .eq("razorpay_payment_id", refund.payment_id);

      if (error) console.log("Refund update error:", error.message);
      else console.log("✅ Refund updated via webhook");
    }

    //  REFUND FAILED

    if (body.event === "refund.failed") {
      const refund = body.payload.refund.entity;

      console.log(" Refund failed:", refund.id);

      await supabase
        .from("orders")
        .update({ payment_status: "refund_failed" })
        .eq("razorpay_payment_id", refund.payment_id);
    }
    // ✅ PAYMENT SUCCESS
    if (body.event === "payment.captured") {
      const payment = body.payload.payment.entity;

      const { data: order, error: fetchError } = await supabase
        .from("orders")
        .select("*")
        .eq("razorpay_order_id", payment.order_id)
        .single();

      if (fetchError || !order) return res.sendStatus(200);

      console.log("Current Payment Status Razorpay:", payment.status);

      //  Idempotency check
    if (order.payment_status === "completed") return res.sendStatus(200);
if (order.payment_status === "paid") return res.sendStatus(200);
      // 🔥 Update order
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          status: "placed",
          payment_status: "paid",
          payment_method: payment.method,
          razorpay_payment_id: payment.id,
          razorpay_signature: receivedSignature,
        })
        .eq("razorpay_order_id", payment.order_id);

      if (updateError) {
        console.log("Update error:", updateError.message);
        return res.sendStatus(200);
      }
      //  Fetch order items separately
      const { data: items } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);
      //  Fetch user  separately
      const { data: user } = await supabase
        .from("users")
        .select("name, role")
        .eq("id", order.user_id)
        .single();

     
      const io = getIO();
      io.to("admin").emit("newOrder", {
        orderId: order.id,
        userName: user?.name || "Unknown",
        role: user?.role || "user",
        products:
          items?.map((item) => ({
            name: item.product_name,
            qty: item.quantity,
            price: item.price,
            image: item.product_image,
          })) || [],
        total: order.total,
        paymentMethod: payment.method,
      });
      console.log("✅ Order updated via webhook");
    }

    // ❌ PAYMENT FAILED
    if (body.event === "payment.failed") {
      const payment = body.payload.payment.entity;

      console.log("❌ Payment failed");

      await supabase
        .from("orders")
        .update({ payment_status: "failed" })
        .eq("razorpay_order_id", payment.order_id);
    }

    return res.status(200).json({ message: "Webhook processed" });
  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
    return res.status(500).send("Server error");
  }
};
