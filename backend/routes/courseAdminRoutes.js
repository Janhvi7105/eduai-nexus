import express from "express";

import {

  getAllCourses,

  deleteCourse,

  approveCourse,

  featureCourse,

} from "../controllers/courseAdminController.js";

import { protect }
from "../middleware/authMiddleware.js";

const router =
  express.Router();


// =======================================
// GET ALL COURSES
// =======================================
router.get(
  "/",
  protect,
  getAllCourses
);


// =======================================
// DELETE COURSE
// =======================================
router.delete(
  "/:id",
  protect,
  deleteCourse
);


// =======================================
// APPROVE COURSE
// =======================================
router.put(
  "/approve/:id",
  protect,
  approveCourse
);


// =======================================
// FEATURE COURSE
// =======================================
router.put(
  "/feature/:id",
  protect,
  featureCourse
);

export default router;