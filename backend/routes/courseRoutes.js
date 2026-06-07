import express from "express";

import {
  createCourse,
  getCourses,
  getSingleCourse,
  getMyCourses,
  getCourseContent,
  updateCourse,
  addSection,
  addLecture,
  editLecture,
  editSection,
  deleteLecture,
  deleteSection,
} from "../controllers/courseController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();


// ==========================
// 📚 PUBLIC ROUTES
// ==========================

// Get all courses
router.get(
  "/",
  getCourses
);

// Get my courses (student's enrolled courses)
router.get(
  "/my-courses",
  protect,
  getMyCourses
);

// Get course content (protected - checks enrollment)
router.get(
  "/course-content/:id",
  protect,
  getCourseContent
);

// Get single course
router.get(
  "/:id",
  getSingleCourse
);


// ==========================
// 🔐 PROTECTED ROUTES (TEACHER)
// ==========================

// Create course
router.post(
  "/create",
  protect,
  createCourse
);


// ==========================
// ✏️ EDIT LECTURE
// ==========================
router.put(
  "/edit-lecture",
  protect,
  editLecture
);


// ==========================
// ✏️ EDIT SECTION
// ==========================
router.put(
  "/edit-section",
  protect,
  editSection
);


// ==========================
// ✏️ UPDATE COURSE
// ==========================
router.put(
  "/:id",
  protect,
  updateCourse
);


// ==========================
// ➕ ADD MODULE
// ==========================
router.post(
  "/add-section",
  protect,
  addSection
);


// ==========================
// 🗑️ DELETE MODULE
// ==========================
router.delete(
  "/delete-section",
  protect,
  deleteSection
);


// ==========================
// ➕ ADD LECTURE
// ==========================
router.post(
  "/add-lecture",
  protect,
  addLecture
);


// ==========================
// 🗑️ DELETE LECTURE
// ==========================
router.delete(
  "/delete-lecture",
  protect,
  deleteLecture
);

export default router;