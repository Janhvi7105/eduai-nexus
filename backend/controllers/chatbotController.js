import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Safe startup check (does NOT expose the API key)
console.log(
  "🤖 Gemini API:",
  process.env.GEMINI_API_KEY
    ? "Loaded ✅"
    : "Missing ❌"
);

// Initialize Gemini
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const askChatbot = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate request
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    // Get Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Generate response
    const result = await model.generateContent(message);

    res.status(200).json({
      success: true,
      reply: result.response.text(),
    });

  } catch (error) {
    console.error("❌ CHATBOT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get response.",
    });
  }
};