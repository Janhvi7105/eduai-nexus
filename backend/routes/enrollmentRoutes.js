import express from "express";
import {
  enrollCourse,
  getMyCourses,
} from "../controllers/enrollmentController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ ENROLL (NO TOKEN REQUIRED - OTP FLOW)
router.post("/", enrollCourse);

// ✅ GET MY COURSES (LOGIN REQUIRED)
router.get("/my-courses", protect, getMyCourses);

export default router;