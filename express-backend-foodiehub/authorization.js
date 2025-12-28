const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  try {
    // Get token from headers
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ status: false, message: "Authorization header missing" });
    }

    // Format: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: false, message: "Token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next(); // allow request to continue
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
