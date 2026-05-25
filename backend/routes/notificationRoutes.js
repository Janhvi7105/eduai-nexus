import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();


// ================================
// 🔔 GET NOTIFICATIONS
// ================================
router.get(
  "/",
  protect,
  getNotifications
);


// ================================
// ✅ MARK AS READ
// ================================
router.put(
  "/:id",
  protect,
  markAsRead
);


export default router;