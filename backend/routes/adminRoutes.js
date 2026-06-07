import express from "express";

import {
  getStudents,
  getTeachers,
  getPendingTeachers,
  getTeacherHistory,
  approveTeacher,
  rejectTeacher,
  deleteUser,
  getAdminStats,
  getNotifications,
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
// TEACHER REQUEST HISTORY
// =======================================
router.get(
  "/teacher-history",
  protect,
  getTeacherHistory
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
// REJECT TEACHER
// =======================================
router.put(
  "/reject-teacher/:id",
  protect,
  rejectTeacher
);


// =======================================
// DELETE USER
// =======================================
router.delete(
  "/user/:id",
  protect,
  deleteUser
);


// =======================================
// GET NOTIFICATIONS
// =======================================
router.get(
  "/notifications",
  protect,
  getNotifications
);

export default router;