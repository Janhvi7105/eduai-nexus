import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Check whether the Gemini API key is available
console.log(
  "🤖 Gemini API:",
  process.env.GEMINI_API_KEY
    ? "Loaded ✅"
    : "Missing ❌"
);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export default genAI;