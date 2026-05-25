import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  generateCertificate,
} from "../controllers/certificateController.js";

const router = express.Router();


// 🎓 GENERATE CERTIFICATE
router.post(
  "/generate",
  protect,
  generateCertificate
);

export default router;