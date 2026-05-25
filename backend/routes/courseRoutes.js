import express from "express";

import {

  createCourse,

  getCourses,

  getSingleCourse,

  updateCourse,

  addSection,

  addLecture,

  editLecture,

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
// ✏️ EDIT LECTURE
// ==========================
router.put(
  "/edit-lecture",
  protect,
  editLecture
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