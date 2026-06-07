import User from "../models/User.js";
import Course from "../models/Course.js";
import Transaction from "../models/Transaction.js";
import Notification from "../models/Notification.js";
import sendEmail from "../utils/sendEmail.js";

// =======================================
// GET ALL STUDENTS
// =======================================
export const getStudents =
  async (req, res) => {

    try {

      const students =
        await User.find({

          role: "student",
        })
        .populate(
          "enrolledCourses",
          "title"
        )
        .select("-password");

      res.status(200).json({

        success: true,

        students,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch students",
      });
    }
  };


// =======================================
// GET ALL TEACHERS
// =======================================
export const getTeachers =
  async (req, res) => {

    try {

      const teachers =
        await User.find({

          role: "teacher",

          isApproved: true,
        }).select("-password");

      res.status(200).json({

        success: true,

        teachers,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch teachers",
      });
    }
  };


// =======================================
// GET PENDING TEACHERS
// =======================================
export const getPendingTeachers =
  async (req, res) => {

    try {

      const teachers =
        await User.find({

          role: "teacher",

          isApproved: false,
        }).select("-password");

      console.log("PENDING TEACHERS:", teachers);

      res.status(200).json({

        success: true,

        teachers,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch pending teachers",
      });
    }
  };


// =======================================
// TEACHER REQUEST HISTORY
// =======================================
export const getTeacherHistory =
  async (req, res) => {

    try {

      const history =
        await User.find({

          role: "teacher",

          applicationStatus: {
            $in: [
              "approved",
              "rejected",
            ],
          },

        })
        .sort({
          reviewedAt: -1,
        });

      res.status(200).json({

        success: true,

        history,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch history",
      });

    }

  };


// =======================================
// APPROVE TEACHER
// =======================================
export const approveTeacher =
  async (req, res) => {

    try {

      const teacher =
        await User.findById(
          req.params.id
        );

      if (!teacher) {

        return res.status(404).json({

          success: false,

          message:
            "Teacher not found",
        });
      }

      teacher.isApproved = true;

      teacher.applicationStatus =
        "approved";

      teacher.reviewedAt =
        new Date();

      await teacher.save();

      // Create notification
      await Notification.create({

        title: "Instructor Approved",

        message:
          `${teacher.name} was approved as instructor`,

        type: "completion",
      });

      // Send approval email to teacher
      await sendEmail(
        teacher.email,
        "Instructor Application Approved",
        `Congratulations ${teacher.name}!

Your instructor application has been approved.

You can now login and access the Teacher Dashboard.

Regards,
EduAI Nexus Team`
      );

      res.status(200).json({

        success: true,

        message:
          "Teacher approved successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to approve teacher",
      });
    }
  };


// =======================================
// REJECT TEACHER
// =======================================
export const rejectTeacher =
  async (req, res) => {

    try {

      const teacher =
        await User.findById(
          req.params.id
        );

      if (!teacher) {

        return res.status(404).json({

          success: false,

          message:
            "Teacher not found",
        });

      }

      teacher.isApproved = false;

      teacher.applicationStatus =
        "rejected";

      teacher.reviewedAt =
        new Date();

      await teacher.save();

      res.status(200).json({

        success: true,

        message:
          "Teacher rejected",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to reject teacher",
      });

    }

  };


// =======================================
// DELETE USER
// =======================================
export const deleteUser =
  async (req, res) => {

    try {

      await User.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message:
          "User deleted successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to delete user",
      });
    }
  };


// =======================================
// ADMIN DASHBOARD STATS
// =======================================
export const getAdminStats = async (req, res) => {
  try {

    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalTeachers = await User.countDocuments({
      role: "teacher",
      isApproved: true,
    });

    const totalCourses = await Course.countDocuments();

    const revenueData = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0
        ? revenueData[0].totalRevenue
        : 0;

    res.status(200).json({
      success: true,
      totalStudents,
      totalTeachers,
      totalCourses,
      totalRevenue,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};

// =======================================
// GET NOTIFICATIONS
// =======================================
export const getNotifications =
  async (req, res) => {

    try {

      const notifications =
        await Notification.find()

        .sort({
          createdAt: -1,
        })

        .limit(20);

      res.json({

        success: true,

        notifications,
      });

    } catch (error) {

      res.status(500).json({

        success: false,
      });
    }
  };