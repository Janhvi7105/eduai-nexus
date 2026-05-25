import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/user", userRoutes);
app.use("/api/enroll", enrollmentRoutes);
app.get("/", (req, res) => {
  res.send("EduAI Nexus API running 🚀");
});

export default app;   // ⚠️ THIS LINE IS IMPORTANT