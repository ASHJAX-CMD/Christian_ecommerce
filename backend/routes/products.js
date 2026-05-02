const express = require("express");
const Product = require("../models/mongodb/Product");
const router = express.Router();
const role = require("../middlewares/role");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const { NUMBER } = require("sequelize");
const { uploadToCloudinary } = require("../services/upload.service");
const cloudinary = require("../utils/cloudinary");

//for getting id of the image to be removed from media db Cloudinary
const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");

  const uploadIndex = parts.indexOf("upload");
  console.log("Correct Public ID:", uploadIndex);

  // keep full folder path AFTER version
  const publicPath = parts.slice(uploadIndex + 2).join("/");
  console.log("Correct Public ID:", publicPath);
  const publicId = publicPath.split(".")[0];

  console.log("Correct Public ID:", publicId);

  return publicId;
};

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
    const min = Math.max(0, Number(req.query.minPrice));
    const max = Math.min(100000, Number(req.query.maxPrice));
    query.price = {
      $gte: min,
      $lte: max,
    };
  }

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  const totalCount = await Product.countDocuments(query);
  console.log("REQ QUERY:", req.query);
  console.log("QUERY:", query);

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

        if (typeof removed === "string") {
          removed = [removed];
        }

        //  Delete from Cloudinary
        const ress = await Promise.all(
          removed.map((url) => {
            const publicId = getPublicIdFromUrl(url);
            return cloudinary.uploader.destroy(publicId);
          }),
        );

        //delete from bakend
        await Product.findByIdAndUpdate(id, {
          $pull: { images: { $in: removed } },
        });

        console.log("removed img data", ress);
      }

      // --- Add new images ---

      if (req.files && req.files.length > 0) {
        const imageUploads = await Promise.all(
          req.files.map((file) =>
            uploadToCloudinary(file.buffer, "products/images"),
          ),
        );
        const urls = imageUploads.map((img) => img.secure_url);
        await Product.findByIdAndUpdate(id, {
          $push: { images: { $each: urls } }, // FIXED
        });
      }

      // --- Update other fields ---
      let otherFields = { ...req.body };
      delete otherFields.removedImages;
      delete otherFields.newImages;
      otherFields = transformProductFields(otherFields);
      console.log("Data before Updating in Patch", otherFields);
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

      const imageFiles = req.files?.images || [];
      const videoFile = req.files?.video?.[0];

      const imageUploads = await Promise.all(
        imageFiles.map((file) =>
          uploadToCloudinary(file.buffer, "products/images"),
        ),
      );

      // Upload video
      let videoUpload = null;
      if (videoFile) {
        videoUpload = await uploadToCloudinary(
          videoFile.buffer,
          "products/videos",
        );
      }

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
        //  store URLs now
        images: imageUploads.map((img) => img.secure_url),
        video: videoUpload?.secure_url || null,
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
