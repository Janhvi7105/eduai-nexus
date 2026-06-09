import express from "express";
import protect from "../middleware/authMiddleware.js";

import {

  getProfile,

  updateProfile,

  updatePassword,

  saveOnboarding,

  getAllStudents,

  getStudentStats,

} from "../controllers/userController.js";


const router = express.Router();


// =====================================
// 👤 PROFILE ROUTES
// =====================================

// ✅ GET PROFILE
router.get(
  "/profile",
  protect,
  getProfile
);


// ✅ UPDATE PROFILE
router.put(
  "/profile",
  protect,
  updateProfile
);


// =====================================
// 🔐 PASSWORD ROUTE
// =====================================

// ✅ UPDATE PASSWORD
router.put(
  "/password",
  protect,
  updatePassword
);


// =====================================
// 🚀 ONBOARDING ROUTE
// =====================================

// ✅ SAVE ONBOARDING
router.post(
  "/onboarding",
  protect,
  saveOnboarding
);


// =====================================
// 👨‍🎓 STUDENT ROUTES
// =====================================

// ✅ GET ALL REGISTERED STUDENTS
router.get(
  "/students",
  protect,
  getAllStudents
);


// ✅ GET STUDENT DASHBOARD STATS
router.get(
  "/student-stats",
  protect,
  getStudentStats
);


// =====================================
// ✅ EXPORT ROUTER
// =====================================
export default router;