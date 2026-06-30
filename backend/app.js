import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("EduAI Nexus API running 🚀");
});

export default app;   // ⚠️ THIS LINE IS IMPORTANT