const express = require("express");
const router = express.Router();
const { sequelize } = require("../db/mysql");

const Order = require("../models/mysql/Order");
const OrderItem = require("../models/mysql/OrderItems");
const Product = require("../models/mongodb/Product");

const auth = require("../middlewares/auth");
const Address = require("../models/mysql/address");

/* ======================================================
   CREATE ORDER (SECURE VERSION)
====================================================== */
router.post("/", auth, async (req, res) => {
  const t = await sequelize.transaction();

  const stockUpdates = []; // rollback tracker

  try {
    const { items, address } = req.body;

    // ✅ Validate address
    const userAddress = await Address.findOne({
      where: {
        id: address,
        userId: req.user.id,
      },
    });

    if (!userAddress) {
      throw new Error("Invalid address");
    }

    // ✅ Validate items
    if (!items || !items.length) {
      return res.status(400).json({ message: "No items provided" });
    }

    // ✅ Merge duplicate products
    const mergedItemsMap = new Map();

    for (const item of items) {
      // quantity validation
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throw new Error("Invalid quantity");
      }

      if (mergedItemsMap.has(item.productId)) {
        mergedItemsMap.get(item.productId).quantity += item.quantity; 
      } else {
        mergedItemsMap.set(item.productId, { ...item });
      }
    }

    const mergedItems = Array.from(mergedItemsMap.values());

    // ✅ Extract product IDs
    const productIds = mergedItems.map((i) => i.productId);

    // ✅ Fetch products
    const products = await Product.find(
      { _id: { $in: productIds } },
      { name: 1, price: 1, image: 1, stock: 1 },
    );

    // ✅ Create Map
    const productMap = new Map();
    products.forEach((p) => productMap.set(p._id.toString(), p));

    let total = 0;
    const orderItemsData = [];

    // ✅ Process items
    for (const item of mergedItems) {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      // ✅ Atomic stock update
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          quantity: { $gte: item.quantity },
        },
        {
          $inc: { quantity: -item.quantity },
        },
        { new: true },
      );

      if (!updatedProduct) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      // track for rollback
      stockUpdates.push({
        productId: item.productId,
        quantity: item.quantity,
      });

      const realPrice = product.price;
      total += realPrice * item.quantity;

      orderItemsData.push({
        productId: product._id.toString(),
        productName: product.name,
        productImage: product.image,
        price: realPrice,
        quantity: item.quantity,
      });
    }

    // ✅ Create Order (SQL)
    const order = await Order.create(
      {
        total,
        userId: req.user.id,
        addressId: address,
        status: "pending",
        paymentStatus: "pending",
      },
      { transaction: t },
    );

    // ✅ Attach orderId
    const finalItems = orderItemsData.map((item) => ({
      ...item,
      orderId: order.id,
    }));

    // ✅ Save items
    await OrderItem.bulkCreate(finalItems, { transaction: t });

    // ✅ Commit SQL
    await t.commit();

    // ✅ Return order
    const orderWithItems = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, as: "items" }],
    });

    res.status(201).json(orderWithItems);
  } catch (err) {
    // 🔁 Rollback MongoDB stock
    for (const item of stockUpdates) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { quantity: item.quantity } },
      );
    }

    await t.rollback();

    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// router.post("/", auth, async (req, res) => {
//   const t = await sequelize.transaction();

//   try {
//     const { items, address } = req.body;
//     const userAddress = await Address.findOne({
//       where: {
//         id: address,
//         userId: req.user.id,
//       },
//     });

//     if (!userAddress) {
//       throw new Error("Invalid address"); 
//     }

//     if (!items || !items.length) {
//       return res.status(400).json({ message: "No items provided" });
//     }

//     let total = 0;
//     const orderItemsData = [];

//     // 🔐 Validate products from MongoDB
//     for (const item of items) {
//       const product = await Product.findById(item.productId);

//       if (!product) {
//         throw new Error("Product not found");
//       }

//       const realPrice = product.price;

//       total += realPrice * item.quantity;

//       orderItemsData.push({
//         productId: product._id.toString(),
//         productName: product.name,
//         productImage: product.image,
//         price: realPrice,
//         quantity: item.quantity,
//       });
//     }

//     // 🧾 Create Order
//     const order = await Order.create(
//       {
//         total,
//         userId: req.user.id,
//         addressId: address,
//         status: "pending",
//         paymentStatus: "pending",
//       },
//       { transaction: t },
//     );

//     // 📦 Attach orderId to each item
//     const finalItems = orderItemsData.map((item) => ({
//       ...item,
//       orderId: order.id,
//     }));

//     await OrderItem.bulkCreate(finalItems, { transaction: t });

//     await t.commit();

//     // 🔎 Return order with items
//     const orderWithItems = await Order.findByPk(order.id, {
//       include: [{ model: OrderItem, as: "items" }],
//     });

//     res.status(201).json(orderWithItems);
//   } catch (err) {
//     await t.rollback();
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });

/* ======================================================
   GET ALL ORDERS FOR LOGGED-IN USER
====================================================== */
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ model: OrderItem, as: "items" }],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================================================
   ADMIN: GET ALL ORDERS
====================================================== */
router.get("/admin/all", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orders = await Order.findAll({
      include: [{ model: OrderItem, as: "items" }],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/all", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
/* ======================================================
   GET SINGLE ORDER
====================================================== */
router.get("/:orderId", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId,
        userId: req.user.id,
      },
      include: [{ model: OrderItem, as: "items" }],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================================================
   UPDATE ORDER STATUS (ADMIN)
====================================================== */
router.put("/:orderId", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { status } = req.body;

    const order = await Order.findByPk(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================================================
   DELETE ORDER (CANCEL IF PENDING)
====================================================== */
router.delete("/:orderId", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId,
        userId: req.user.id,
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Cannot cancel this order" });
    }

    await order.destroy();

    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
