const Order = require("../models/mysql/Order");
const crypto = require("crypto");
const { getIO } = require("../config/socket");
const User = require("../models/mysql/User");
const Product = require("../models/mongodb/Product");
const OrderItem = require("../models/mysql/OrderItems");
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
    //  if (body.event === "refund.created") {
    //   const refund = body.payload.refund.entity;

    //   console.log("💸 Refund created:", refund.id);

    //   const order = await Order.findOne({
    //     where: { razorpayPaymentId: refund.payment_id },
    //   });

    //   if (order) {
    //     await Order.update(
    //       {
    //         paymentStatus: "pending",
    //         status:"placed",
    //         refundId: refund.id,
    //         refundedAt: new Date(),
    //       },
    //       {
    //         where: { razorpayPaymentId: refund.payment_id },
    //       },
    //     );

    //     console.log("✅ Refund updated via webhook");
    //   }
    // }
    //  if (body.event === "refund.pending") {
    //   const refund = body.payload.refund.entity;

    //   console.log("💸 Refund pending:", refund.id);

    //   const order = await Order.findOne({
    //     where: { razorpayPaymentId: refund.payment_id },
    //   });

    //   if (order) {
    //     await Order.update(
    //       {
    //         paymentStatus: "refund_pending",
    //         status:"placed",
    //         refundId: refund.id,
    //         refundedAt: new Date(),
    //       },
    //       {
    //         where: { razorpayPaymentId: refund.payment_id },
    //       },
    //     );

    //     console.log("✅ Refund updated via webhook");
    //   }
    // }

    if (body.event === "refund.processed") {
      const refund = body.payload.refund.entity;
      const order = await Order.findOne({
        where: { razorpayOrderId: payment.order_id },
      });
      console.log("💸 Refund processed:", refund.id);

      if (order) {
        await Order.update(
          {
            paymentStatus: "refunded",
            status: "cancelled",
            refundId: refund.id,
            refundedAt: new Date(),
          },
          {
            where: { razorpayPaymentId: refund.payment_id },
          },
        );

        console.log("✅ Refund updated via webhook");
      }
    }
    // ❌ REFUND FAILED
    if (body.event === "refund.failed") {
      const refund = body.payload.refund.entity;

      console.log("❌ Refund failed:", refund.id);

      await Order.update(
        {
          paymentStatus: "refund_failed",
        },
        {
          where: { razorpayPaymentId: refund.payment_id },
        },
      );
    }
    // ✅ PAYMENT SUCCESS
    if (body.event === "payment.captured") {
      const payment = body.payload.payment.entity;

      const order = await Order.findOne({
        where: { razorpayOrderId: payment.order_id },
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: OrderItem,
            as: "items",
            // include: [
            //   {
            //     model: Product,
            //     attributes: ["name"],
            //   },
            // ],
          },
        ],
      });

      if (!order) return res.sendStatus(200);

      console.log("Current Payment Status Razorpay:", payment.status);

      if (order.paymentStatus === "completed") {
        return res.sendStatus(200);
      }

      if (order.paymentStatus === "paid") {
        return res.sendStatus(200); // already handled
      }
      await Order.update(
        {
          status: "placed",
          paymentStatus: "paid",
          paymentMethod: payment.method,
          razorpayPaymentId: payment.id,
          razorpaySignature: receivedSignature,
        },
        {
          where: {
            razorpayOrderId: payment.order_id,
          },
        },
      );

      console.log("EMITTING ORDER:", {
        order,
        user: order?.User,
        items: order?.items,
      });
      const io = getIO();
      io.to("admin").emit("newOrder", {
        orderId: order.id,
        userName: order.User.name,
        products: order.items.map((item) => ({
          name: item.name, // ✅ from SQL
          qty: item.quantity,
          price: item.price,
          image: item.image,
        })),
        total: order.total,
        paymentMethod: payment.method,
      });
      console.log("✅ Order updated via webhook");
    }

    // ❌ PAYMENT FAILED
    if (body.event === "payment.failed") {
      const payment = body.payload.payment.entity;

      console.log("❌ Payment failed");

      await Order.update(
        { paymentStatus: "failed" },
        { where: { razorpayOrderId: payment.order_id } },
      );
    }

    return res.status(200).json({ message: "Webhook processed" });
  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
    return res.status(500).send("Server error");
  }
};
