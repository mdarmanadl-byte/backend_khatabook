const express = require("express");
const Customer = require("../models/customer");
const authMiddleware = require("../middleware/autho");

const router = express.Router();

// ADD CUSTOMER
router.post("/", authMiddleware, async (req, res) => {
  const { name, mobileNumber } = req.body;

  const customer = new Customer({
    name,
    mobileNumber,
    userId: req.userId // 🔥 ownership
  });

  await customer.save();
  res.json(customer);
});

// GET MY CUSTOMERS
router.get("/", authMiddleware, async (req, res) => {
  const customers = await Customer.find({ userId: req.userId });
  res.json(customers);
});

module.exports = router;
