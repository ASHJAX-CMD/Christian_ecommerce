const express = require("express");
const router = express.Router();

const Product = require("../models/mongodb/Product");

const auth = require("../middlewares/auth");

const supabase = require("../config/supabase");
/* ======================================================
   CREATE ORDER (SECURE VERSION)
====================================================== */
router.post("/", auth, async (req, res) => {
  const stockUpdates = []; // rollback tracker

  try {
    const { items, address } = req.body;

    //  Validate address
const { data: userAddress, error: addressError } = await supabase
  .from("addresses")
  .select("*")
  .eq("id", address)
  .eq("user_id", req.user.id)
  .single();

if (addressError || !userAddress) {
  return res.status(400).json({ message: "Invalid address" });
}

    //  Validate items
    if (!items || !items.length) {
      return res.status(400).json({ message: "No items provided" });
    }

    //  Merge duplicate products
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

    //  Extract product IDs
    const productIds = mergedItems.map((i) => i.productId);

    //  Fetch products
    const products = await Product.find(
      { _id: { $in: productIds } },
      { name: 1, price: 1, images: 1, stock: 1 },
    );

    //  Create Map
    const productMap = new Map();
    products.forEach((p) => productMap.set(p._id.toString(), p));

    let total = 0;
    const orderItemsData = [];

    //  Process items
    for (const item of mergedItems) {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      //  Atomic stock update
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
        productImage: product.images,
        price: realPrice,
        quantity: item.quantity,
      });
    }

    // CREATE ORDER (SUPABASE)
    // -------------------------
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: req.user.id,
        address_id: address,
        total,
        status: "pending",
        payment_status: "pending",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // CREATE ORDER ITEMS
    const finalItems = orderItemsData.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      product_image: item.productImage,
      price: item.price,
      quantity: item.quantity,
    }));
    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(finalItems);
    if (itemsError) throw itemsError;

    res.status(201).json({
      ...order,
      items: finalItems,
    });
  }catch (err) {
    // -------------------------
    // ROLLBACK (MANUAL)
    // -------------------------

    for (const item of stockUpdates) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { quantity: item.quantity } }
      );
    }

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
const { data: orders, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*)
      `)
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching orders" });
    }

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
    // 🔐 Admin check
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    // 📦 Fetch all orders
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching orders" });
    }

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Particular Order details with Items
router.get("/admin/:orderId", auth, async (req, res) => {
  try {
    // 🔐 Admin check
    if (req.user.role !== "admin") {
      console.log("not admin");
      return res.status(403).json({ message: "Forbidden" });
    }

    const orderId = parseInt(req.params.orderId);

    if (isNaN(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    // 📦 Fetch order with relations
    const { data: order, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          product_name,
          product_image,
          price,
          quantity
        ),
        addresses (
          id,
          city,
          state,
          zip
        ),
        users (
          id,
          name,
          email
        )
      `)
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // match old structure (items instead of order_items)
    const formattedOrder = {
      ...order,
      items: order.order_items,
      order_items: undefined,
    };

    res.json(formattedOrder);
  } catch (err) {
    console.error("Error fetching order:", {
      orderId: req.params.orderId,
      error: err.message,
    });

    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/all", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: orders, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching orders" });
    }

    //keep same structure as before (items instead of order_items)
    const formatted = orders.map((o) => ({
      ...o,
      items: o.order_items,
      order_items: undefined,
    }));

    res.json(formatted);
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
    const orderId = parseInt(req.params.orderId);

    if (isNaN(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*)
      `)
      .eq("id", orderId)
      .eq("user_id", req.user.id)
      .single();

    if (error || !order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Optional: match old structure
    const formattedOrder = {
      ...order,
      items: order.order_items,
      order_items: undefined,
    };

    res.json(formattedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================================================
   UPDATE ORDER STATUS (ADMIN)
====================================================== */
router.put("/status/:orderId", auth, async (req, res) => {
  try {
    //  Admin check
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orderId = parseInt(req.params.orderId);
    const { status } = req.body;

    if (isNaN(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    //  Step 1: Update order status
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (updateError) {
      console.error(updateError);
      return res.status(500).json({ message: "Failed to update order" });
    }

    // Step 2: Fetch updated order with relations
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*),
        addresses (*),
        users (id, name, email)
      `)
      .eq("id", orderId)
      .single();

    if (fetchError || !order) {
      return res.status(404).json({ message: "Order not found" });
    }

    //  Match old structure (items instead of order_items)
    const formattedOrder = {
      ...order,
      items: order.order_items,
      order_items: undefined,
    };

    console.log("Updated order:", formattedOrder);

    res.json(formattedOrder);
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
    const orderId = parseInt(req.params.orderId);

    if (isNaN(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    //  Step 1: Check order exists + belongs to user
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("id, status")
      .eq("id", orderId)
      .eq("user_id", req.user.id)
      .single();

    if (fetchError || !order) {
      return res.status(404).json({ message: "Order not found" });
    }

    //  Step 2: Only allow pending orders
    if (order.status !== "pending") {
      return res.status(400).json({ message: "Cannot cancel this order" });
    }

    //  Step 3: Delete order (and items if FK cascade is set)
    const { error: deleteError } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);

    if (deleteError) {
      console.error(deleteError);
      return res.status(500).json({ message: "Failed to delete order" });
    }

    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/admin/dashboard/ordertotaldetails", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Not an admin" });
  }

  try {
    // ✅ Supabase aggregated data
    const { data, error } = await supabase.rpc("get_order_dashboard");
    if (error) throw error;

    const thisMonth = data.thisMonth || {};
    const prevMonthOrderStats = data.prevMonth || {};
    const dailyOrders = data.dailyOrders || [];

    // ✅ Mongo
    const totalProducts = await Product.countDocuments();
    const lowStock = await Product.countDocuments({
      quantity: { $lt: 10 },
    });

    res.json({
      thisMonth,
      prevMonthOrderStats,
      dailyOrders,
      totalProducts,
      lowStock,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
