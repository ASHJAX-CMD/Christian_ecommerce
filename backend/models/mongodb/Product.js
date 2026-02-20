const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  compareAtPrice: { type: Number },
  tags: { type: String },
  category: { type: String },
  brand: { type: String },
  colors: { type: String },
  sizes: { type: [String] },          // array of strings
  images: { type: [String], default: [] }, // array of image URLs
  video: { type: String, default: null },
  slug: { type: String },
  metaTitle: { type: String },
  metaDescription: { type: String },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ["active", "inactive","draft"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
