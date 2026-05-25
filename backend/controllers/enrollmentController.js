import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Notification from "../models/Notification.js";
import bcrypt from "bcryptjs";


// ===================================
// ➕ ENROLL IN COURSE
// ===================================
export const enrollCourse = async (
  req,
  res
) => {

  try {

    const {
      courseId,
      email,
      password,
      name,
      phone,
    } = req.body;


    // ===============================
    // ✅ VALIDATION
    // ===============================
    if (!courseId) {

      return res.status(400).json({

        message:
          "Course ID is required ❗",
      });
    }

    if (!email) {

      return res.status(400).json({

        message:
          "Email is required ❗",
      });
    }

    if (!password) {

      return res.status(400).json({

        message:
          "Password is required ❗",
      });
    }


    // ===============================
    // 🔎 FIND COURSE
    // ===============================
    const course =
      await Course.findById(courseId)
        .populate(
          "instructor",
          "name"
        );

    if (!course) {

      return res.status(404).json({

        message:
          "Course not found ❌",
      });
    }


    // ===============================
    // 🔎 FIND USER
    // ===============================
    let user =
      await User.findOne({
        email,
      });


    // ===============================
    // 🟢 EXISTING USER
    // ===============================
    if (user) {

      // 🔥 CHECK ALREADY ENROLLED
      const existingEnrollment =
        await Enrollment.findOne({

          userId: user._id,

          courseId,
        });

      if (existingEnrollment) {

        return res.status(200).json({

          alreadyEnrolled: true,

          message:
            "Already enrolled ⚠️",
        });
      }


      // 🔥 UPDATE TEMP PASSWORD
      const isTempPassword =
        await bcrypt.compare(
          "temp_user",
          user.password
        );

      if (isTempPassword) {

        const hashedPassword =
          await bcrypt.hash(
            password,
            10
          );

        user.password =
          hashedPassword;

        await user.save();

        console.log(
          "✅ Password updated from temp_user"
        );
      }
    }


    // ===============================
    // 🟢 NEW USER
    // ===============================
    if (!user) {

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      user =
        await User.create({

          email,

          password:
            hashedPassword,

          role: "student",

          name: name || "",

          phone: phone || "",

          enrolledCourses: [],
        });

      console.log(
        "✅ New user created"
      );
    }


    // ===============================
    // ✅ CREATE ENROLLMENT
    // ===============================
    const enrollment =
      await Enrollment.create({

        userId: user._id,

        courseId,
      });


    // ===============================
    // ✅ SAVE COURSE IN USER MODEL
    // ===============================
    if (
      !user.enrolledCourses.includes(
        courseId
      )
    ) {

      user.enrolledCourses.push(
        courseId
      );

      await user.save();
    }


    // ===============================
    // 🔔 CREATE NOTIFICATION
    // ===============================
    await Notification.create({

      title:
        "New Enrollment 🎉",

      message:
        `${user.name} enrolled in ${course.title}`,

      type: "enrollment",

      // ✅ SEND TO TEACHER
      userId:
        course.instructor?._id,
    });


    // ===============================
    // ✅ RESPONSE
    // ===============================
    res.status(201).json({

      success: true,

      message:
        "Enrollment successful 🎉",

      enrollment,
    });

  } catch (error) {

    console.error(
      "❌ ENROLL ERROR:",
      error
    );

    res.status(500).json({

      message:
        "Enrollment failed ❌",
    });
  }
};



// ===================================
// 📥 GET MY COURSES
// ===================================
export const getMyCourses = async (
  req,
  res
) => {

  try {

    const { email } = req.query;

    if (!email) {

      return res.status(400).json({

        message:
          "Email is required ❗",
      });
    }


    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(404).json({

        message:
          "User not found ❌",
      });
    }


    const courses =
      await Enrollment.find({

        userId: user._id,
      }).populate("courseId");


    res.status(200).json({

      success: true,

      courses,
    });

  } catch (error) {

    console.error(
      "❌ GET COURSES ERROR:",
      error
    );

    res.status(500).json({

      message:
        "Failed to fetch courses ❌",
    });
  }
};