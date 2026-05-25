import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ===============================
// 🔐 PROTECT ROUTE
// ===============================
export const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ GET TOKEN FROM HEADER
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ NO TOKEN
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied ❌",
      });
    }

    // ✅ VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded._id || decoded.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found ❌",
      });
    }

    // ✅ ATTACH USER
    req.user = user;

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token ❌",
    });
  }
};

// ===============================
// 🔐 ROLE BASED ACCESS (FULL SAFE)
// ===============================
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      // ✅ Ensure roles is always array
      if (!Array.isArray(roles)) {
        return next();
      }

      // ✅ Ensure user exists
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User not authenticated ❌",
        });
      }

      // ✅ If no roles passed → allow
      if (roles.length === 0) {
        return next();
      }

      // ✅ Safe role check
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied 🚫",
        });
      }

      next();
    } catch (error) {
      console.error("ROLE ERROR:", error.message);

      return res.status(500).json({
        success: false,
        message: "Role check failed ❌",
      });
    }
  };
};

// ✅ Default export (optional)
export default protect;