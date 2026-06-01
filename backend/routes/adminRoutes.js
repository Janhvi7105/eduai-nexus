import express from "express";

import {
  getStudents,
  getTeachers,
  getPendingTeachers,
  approveTeacher,
  deleteUser,
  getAdminStats,
} from "../controllers/adminController.js";

import { protect }
from "../middleware/authMiddleware.js";

const router =
  express.Router();


// =======================================
// ADMIN DASHBOARD STATS
// =======================================
router.get(
  "/stats",
  protect,
  getAdminStats
);

// =======================================
// GET STUDENTS
// =======================================
router.get(
  "/students",
  protect,
  getStudents
);


// =======================================
// GET APPROVED TEACHERS
// =======================================
router.get(
  "/teachers",
  protect,
  getTeachers
);


// =======================================
// GET PENDING TEACHERS
// =======================================
router.get(
  "/pending-teachers",
  protect,
  getPendingTeachers
);


// =======================================
// APPROVE TEACHER
// =======================================
router.put(
  "/approve-teacher/:id",
  protect,
  approveTeacher
);


// =======================================
// DELETE USER
// =======================================
router.delete(
  "/user/:id",
  protect,
  deleteUser
);

export default router;