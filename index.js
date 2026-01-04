require("dotenv").config();
// nnnrnjkfkje
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/custoauth");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://frontend-khatabook-wmkh.vercel.app"
  ],
  credentials: true
}));
// 🔥 DB connection FIRST
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
// routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
// database

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));


// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

