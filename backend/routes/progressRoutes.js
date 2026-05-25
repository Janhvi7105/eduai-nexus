import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/save-progress", protect, async (req, res) => {
  const { courseId, lectureIndex, watchedTime } = req.body;

  const user = await User.findById(req.user._id);

  const existing = user.progress.find(
    (p) => p.courseId.toString() === courseId
  );

  if (existing) {
    existing.lectureIndex = lectureIndex;
    existing.watchedTime = watchedTime;
  } else {
    user.progress.push({ courseId, lectureIndex, watchedTime });
  }

  await user.save();

  res.json({ success: true });
});

export default router;