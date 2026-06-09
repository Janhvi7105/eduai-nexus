import User from "../models/User.js";
import Note from "../models/Note.js";
import Course from "../models/Course.js";

export const getMyNotes = async (req, res) => {
  try {

    const studentId = req.user._id;

    const courses = await Course.find({
      students: studentId,
    });

    const courseIds =
      courses.map(
        (course) => course._id
      );

    const notes =
      await Note.find({
        courseId: {
          $in: courseIds,
        },
      }).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      notes,
    });

  } catch (error) {

    console.error(
      "GET MY NOTES ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// 📖 Upload Note
// ==========================================
export const uploadNote = async (req, res) => {
  try {
    const { title, courseId } = req.body;

    if (!title || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Title and Course are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }

    console.log("FILE INFO:");
    console.log(req.file);

    const note = await Note.create({
      title,
      fileUrl: `/uploads/${req.file.filename}`,
      courseId,
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Note uploaded successfully",
      note,
    });

  } catch (error) {
    console.error("UPLOAD NOTE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload note",
    });
  }
};

// ==========================================
// 📖 Get Notes By Course
// ==========================================
export const getNotesByCourse = async (req, res) => {
  try {

    const { courseId } = req.params;

    const notes = await Note.find({
      courseId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notes,
    });

  } catch (error) {

    console.error("GET NOTES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
    });
  }
};

// ==========================================
// 📖 Delete Note
// ==========================================
export const deleteNote = async (req, res) => {
  try {

    const note = await Note.findById(
      req.params.id
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    await Note.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });

  } catch (error) {

    console.error("DELETE NOTE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete note",
    });
  }
};

// ==========================================
// 📖 Update Note
// ==========================================
export const updateNote = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      courseId: req.body.courseId,
    };

    if (req.file) {
      updateData.fileUrl = `/uploads/${req.file.filename}`;
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      note,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// 📖 Get All Notes
// ==========================================
export const getAllNotes = async (req, res) => {
  try {

    const notes = await Note.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notes,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};