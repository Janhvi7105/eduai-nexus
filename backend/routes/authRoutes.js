import express from "express";
import {
  sendOTP,
  verifyOTP,
  loginUser,
  registerTeacher,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// ================= AUTH ROUTES =================

// 📩 Send OTP
router.post("/send-otp", sendOTP);

// 🔐 Verify OTP (creates student)
router.post("/verify-otp", verifyOTP);

// 🔑 Login
router.post("/login", loginUser);


// ================= 👨‍🏫 TEACHER =================

// 👨‍🏫 Register Teacher (NEW USER FLOW)
router.post("/register-teacher", registerTeacher);


// 🎓 Become Instructor (EXISTING USER FLOW)
router.put("/become-teacher", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found ❌",
      });
    }

    // 🔥 FIX: handle missing role safely
    if (!user.role) {
      user.role = "student";
    }

    // 🔄 Prevent duplicate upgrade
    if (user.role === "teacher") {
      return res.status(400).json({
        success: false,
        message: "User is already a teacher 👨‍🏫",
      });
    }

    // ✅ UPGRADE ROLE
    user.role = "teacher";
    await user.save();

    res.status(200).json({
      success: true,
      message: "🎉 You are now an instructor!",
      user,
    });

  } catch (err) {
    console.error("BECOME TEACHER ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
});

export default router;