const express = require("express");
const Product = require("../models/mongodb/Product");
const router = express.Router();
const role = require("../middlewares/role");
const { upload } = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const { NUMBER } = require("sequelize");
const parseJSON = (value, fallback = []) => {
  if (!value) return fallback;
  if (Array.isArray(value)) return value;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const transformers = {
  sizes: (v) => parseJSON(v),
  price: (v) => Number(v),
  colors: (v) => {
    console.log("Data from Transformers Function", parseJSON(v));
    return parseJSON(v);
  },
  compareAtPrice: (v) => Number(v),
  quantity: (v) => Number(v),

  discount: (v) => (v === "" || v === "null" ? 0 : Number(v)),

  featured: (v) => v === "true",
};
const transformProductFields = (data) => {
  const result = {};

  Object.keys(data).forEach((key) => {
    const value = data[key];

    result[key] = transformers[key] ? transformers[key](value) : value;
  });
  console.log("Data After TransformProductFields", result)
  return result;
};
// GET all products
router.get("/", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const query = {};

  // 🔹 color filter
  const colorQuery = req.query.color || req.query["color[]"];
  if (colorQuery) {
    query.colors = { $in: [].concat(colorQuery) };
  }

  // 🔹 size filter
  const sizeQuery = req.query.size || req.query["size[]"];

  if (sizeQuery) {
    query.sizes = { $in: [].concat(sizeQuery) };
  }
  // 🔹 price filter
  if (req.query.minPrice && req.query.maxPrice) {
    query.price = {
      $gte: Number(req.query.minPrice),
      $lte: Number(req.query.maxPrice),
    };
  }

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  const totalCount = await Product.countDocuments(query);
  console.log("REQ QUERY:", req.query);
  console.log("QUERY:", query);
  console.log("products that are Being sent",products)
  res.json({ products, totalCount });
});

// PATCH (update product)
router.patch(
  "/:id",
  role(["admin"]),
  upload.array("newImages"),
  async (req, res) => {
    console.log("this is the Data form Frontend", req.body);
    try {
      const { id } = req.params;
      if (req.body.discount === "null" || req.body.discount === "") {
        req.body.discount = 0;
      }
      // --- Remove images ---
      if (req.body.removedImages) {
        let removed = req.body.removedImages;
        if (typeof removed === "string") removed = [removed];

        await Product.findByIdAndUpdate(id, {
          $pull: { images: { $in: removed } },
        });
      }

      // --- Add new images ---
      if (req.files && req.files.length > 0) {
        const newImgs = req.files.map((f) => f.filename);

        await Product.findByIdAndUpdate(id, {
          $push: { images: { $each: newImgs } },
        });
      }

      // --- Update other fields ---
      let otherFields = { ...req.body };
      delete otherFields.removedImages;
      delete otherFields.newImages;
      otherFields = transformProductFields(otherFields);
      console.log("Data before Updating in Patch",otherFields)
      if (Object.keys(otherFields).length > 0) {
        await Product.findByIdAndUpdate(id, { $set: otherFields });
      }

      const updatedProduct = await Product.findById(id);
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(updatedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
);

// DELETE product
router.delete("/:id", auth, role(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const productdelete = await Product.findByIdAndDelete(id);

    if (!productdelete) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(productdelete);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", err });
  }
});

// POST new product
router.post(
  "/",
  role(["admin"]),
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const product = new Product({
        name: req.body.name,
        price: Number(req.body.price),
        description: req.body.description,
        category: req.body.category,
        brand: req.body.brand,
        tags: parseJSON(req.body.tags, req.body.tags),
        colors: parseJSON(req.body.colors, req.body.colors),
        sizes: parseJSON(req.body.sizes),
        discount: req.body.discount ? Number(req.body.discount) : undefined,
        slug: req.body.slug,
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription,
        featured: req.body.featured === "true",
        status: req.body.status || "draft",
        quantity: req.body.quantity,
        images: req.files?.images?.map((f) => f.filename) || [],
        video: req.files?.video?.[0]?.filename || null,
      });
      console.log("NEW Product", product);
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      console.error("Save error:", err);
      res.status(500).json({ message: err.message });
    }
  },
);

// GET single product
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
