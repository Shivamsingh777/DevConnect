const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Get current user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

// Update profile
router.put("/update", auth, async (req, res) => {
  const { name, bio } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userId,
    { name, bio },
    { new: true }
  ).select("-password");
  res.json(user);
});

module.exports = router;
