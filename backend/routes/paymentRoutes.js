import express from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// 💳 CREATE ORDER
// ==========================
router.post(
  "/create-order",
  protect,
  createOrder
);

// ==========================
// ✅ VERIFY PAYMENT + ENROLL
// ==========================
router.post(
  "/verify-payment",
  protect,
  verifyPayment
);

export default router;