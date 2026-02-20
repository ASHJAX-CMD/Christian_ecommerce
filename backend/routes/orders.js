const express = require("express");
const router = express.Router();
const Order = require("../models/mysql/Order");
const OrderItem = require("../models/mysql/OrderItems");
const auth = require("../middlewares/auth");

// CREATE order with items
router.post("/", auth, async (req, res) => {
  try {
    const { items } = req.body; // items = [{ productId, quantity, price }]
    if (!items || !items.length) {
      return res.status(400).json({ message: "No items provided" });
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      total,
      UserId: req.user.id,
    });

    const orderItems = items.map(item => ({ ...item, OrderId: order.id }));
    await OrderItem.bulkCreate(orderItems);

    // Fetch full order with items
    const orderWithItems = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, as: "items" }],
    });

    res.json(orderWithItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all orders for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
      include: [{ model: OrderItem, as: "items" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single order
router.get("/:orderId", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.orderId, UserId: req.user.id },
      include: [{ model: OrderItem, as: "items" }],
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE order status (admin)
router.put("/:orderId", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const { status } = req.body;
    const order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE order (cancel if pending)
router.delete("/:orderId", auth, async (req, res) => {
  try {
    const order = await Order.findOne({ where: { id: req.params.orderId, UserId: req.user.id } });
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status !== "pending") return res.status(400).json({ message: "Cannot cancel order" });

    await order.destroy();
    res.json({ message: "Order cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: get all orders
router.get("/admin/all", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const orders = await Order.findAll({ include: [{ model: OrderItem, as: "items" }], order: [["createdAt", "DESC"]] });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
