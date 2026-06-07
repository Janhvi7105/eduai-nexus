import express from "express";
import multer from "multer";
import {
  uploadNote,
  getNotesByCourse,
  updateNote,
  deleteNote,
  getAllNotes,
} from "../controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage,
});

// ================= GET ALL NOTES =================
router.get(
  "/",
  authMiddleware,
  getAllNotes
);

// ================= UPLOAD NOTE =================
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadNote
);

// ================= GET NOTES OF A COURSE =================
router.get(
  "/course/:courseId",
  authMiddleware,
  getNotesByCourse
);

// ================= UPDATE NOTE =================
router.put(
  "/:id",
  authMiddleware,
  upload.single("file"),
  updateNote
);

// ================= DELETE NOTE =================
router.delete(
  "/:id",
  authMiddleware,
  deleteNote
);

export default router;