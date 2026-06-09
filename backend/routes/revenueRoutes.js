import express from "express";

import {

  getTeacherRevenue,

  getAdminRevenue,

} from "../controllers/revenueController.js";

import protect from "../middleware/authMiddleware.js";

const router =
  express.Router();


// =======================================
// TEACHER REVENUE
// =======================================
router.get(
  "/teacher",
  protect,
  getTeacherRevenue
);


// =======================================
// ADMIN REVENUE
// =======================================
router.get(
  "/admin",
  protect,
  getAdminRevenue
);

export default router;