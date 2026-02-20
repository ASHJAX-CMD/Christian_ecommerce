const express = require("express");
const Review = require("../models/mongodb/Review");
const auth = require("../middlewares/auth");
const router = express.Router();

// Add review (authenticated user)
router.post("/", auth, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating) {
      return res.status(400).json({ message: "Product ID and rating are required" });
    }

    const review = new Review({
      productId,
      userId: req.user.id, // from JWT
      userName: req.user.name, // optional: store name for convenience
      rating,
      comment,
    });

    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get reviews by product
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .sort({ createdAt: -1 }); // latest first
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
