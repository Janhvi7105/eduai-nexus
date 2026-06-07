import dotenv from "dotenv";
dotenv.config();

console.log(
  "CHATBOT GEMINI KEY =",
  process.env.GEMINI_API_KEY
);

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

export const askChatbot = async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
    const result = await model.generateContent(message);

    res.status(200).json({
      success: true,
      reply: result.response.text(),
    });

  } catch (error) {
    console.error("CHATBOT ERROR FULL:", error);
    console.log("STATUS:", error.status);
    console.log("MESSAGE:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get response.",
    });
  }
};