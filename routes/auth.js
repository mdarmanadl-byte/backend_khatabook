const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { shopname, mobileNumber, password } = req.body;

    if (!shopname || !mobileNumber || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      shopname,
      mobileNumber,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Signup successful"
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔐 compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🎫 create token
    const token = jwt.sign(
      { userId: user._id },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        shopname: user.shopname
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
