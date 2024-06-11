const { User } = require("../models");
const jwt = require("jsonwebtoken");

exports.authenticateToken = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    console.log("User:", req.user); // Debug statement to log user
    next();
  } catch (err) {
    console.error("Token verification error:", err); // Log the error for debugging
    return res.status(401).json({ error: "Invalid token" });
  }
};
