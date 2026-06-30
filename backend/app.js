import express from "express";
import cors from "cors";
const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://eduai-nexus-62rilpkln-janhvi7105-projects.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("EduAI Nexus API running 🚀");
});

export default app;   // ⚠️ THIS LINE IS IMPORTANT