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
          "teacher",
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

      const course =
        await Course.findById(
          req.params.id
        );

      course.approved = true;

      await course.save();

      res.status(200).json({

        success: true,

        message:
          "Course approved successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to approve course",
      });
    }
  };


// =======================================
// FEATURE COURSE
// =======================================
export const featureCourse =
  async (req, res) => {

    try {

      const course =
        await Course.findById(
          req.params.id
        );

      course.featured =
        !course.featured;

      await course.save();

      res.status(200).json({

        success: true,

        message:
          "Course updated successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to feature course",
      });
    }
  };