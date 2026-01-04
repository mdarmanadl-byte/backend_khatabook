const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // console.log("🔥 MIDDLEWARE HIT");
  // console.log("🔥 AUTH HEADER RECEIVED:", req.headers.authorization);

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No Authorization header" });
  }

  const token = req.headers.authorization.split(" ")[1];
  // console.log("🔥 TOKEN EXTRACTED:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("🔥 DECODED TOKEN:", decoded);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    // console.log("🔥 JWT ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
