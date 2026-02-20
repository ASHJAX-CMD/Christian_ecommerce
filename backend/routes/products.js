const express = require("express");
const Product = require("../models/mongodb/Product");
const router = express.Router();
const role = require("../middlewares/role");
const { upload } = require("../middlewares/upload");

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// PATCH (update product)
router.patch("/:id",  role(["admin"]), upload.array("newImages"), async (req, res) => {
  try {
    const { id } = req.params;

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
});

// DELETE product
router.delete("/:id", role(["admin"]), async (req, res) => {
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
        tags: req.body.tags,
        colors: req.body.colors,
        sizes: req.body.sizes ? req.body.sizes.split(",") : [],
        compareAtPrice: req.body.compareAtPrice
          ? Number(req.body.compareAtPrice)
          : undefined,
        discount: req.body.discount ? Number(req.body.discount) : undefined,
        slug: req.body.slug,
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription,
        featured: req.body.featured === "true",
        status: req.body.status || "draft",

        images: req.files?.images?.map((f) => f.filename) || [],
        video: req.files?.video?.[0]?.filename || null,
      });

      await product.save();
      res.status(201).json(product);
    } catch (err) {
      console.error("Save error:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

// GET single product
router.get("/:productId",  async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
