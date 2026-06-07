import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

console.log(
  "Gemini Key:",
  process.env.GEMINI_API_KEY
    ? "Loaded ✅"
    : "Missing ❌"
);

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export default genAI;