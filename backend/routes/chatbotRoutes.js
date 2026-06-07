import express from "express";
import { askChatbot } from "../controllers/chatbotController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/ask", authMiddleware, askChatbot);

export default router;