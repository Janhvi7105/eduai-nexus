import Course from "../models/Course.js";


// =======================================
// GET ALL COURSES
// =======================================
export const getAllCourses =
  async (req, res) => {

    try {

      const courses =
  await Course.find()
  .populate(
    "instructor",
    "name email"
  );

      res.status(200).json({

        success: true,

        courses,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch courses",
      });
    }
  };


// =======================================
// DELETE COURSE
// =======================================
export const deleteCourse =
  async (req, res) => {

    try {

      await Course.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message:
          "Course deleted successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to delete course",
      });
    }
  };


// =======================================
// APPROVE COURSE
// =======================================
export const approveCourse =
  async (req, res) => {

    try {

      console.log(
        "APPROVE REQUEST:",
        req.params.id
      );

      const course =
        await Course.findById(
          req.params.id
        );

      console.log(
        "COURSE:",
        course
      );

      if (!course) {

        return res.status(404).json({

          success: false,

          message:
            "Course not found",
        });
      }

      course.approved = true;

      await course.save();

      res.status(200).json({

        success: true,

        message:
          "Course approved successfully",
      });

    } catch (error) {

      console.log(
        "APPROVE ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

// =======================================
// FEATURE COURSE
// =======================================
export const featureCourse =
  async (req, res) => {

    try {

      console.log(
        "FEATURE REQUEST:",
        req.params.id
      );

      const course =
        await Course.findById(
          req.params.id
        );

      console.log(
        "COURSE:",
        course
      );

      if (!course) {

        return res.status(404).json({

          success: false,

          message:
            "Course not found",
        });
      }

      course.featured =
        !course.featured;

      await course.save();

      res.status(200).json({

        success: true,

        message:
          "Course featured successfully",
      });

    } catch (error) {

      console.log(
        "FEATURE ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };