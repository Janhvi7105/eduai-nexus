import Certificate from "../models/Certificate.js";
import Course from "../models/Course.js";
import User from "../models/User.js";


// =======================================
// 🎓 GENERATE CERTIFICATE
// =======================================
export const generateCertificate = async (
  req,
  res
) => {

  try {

    const { courseId } = req.body;


    // ================= USER =================
    const user =
      await User.findById(
        req.user._id
      );


    // ================= COURSE =================
    const course =
      await Course.findById(
        courseId
      ).populate("instructor", "name");
      
    console.log("COURSE =>", course);
    console.log("INSTRUCTOR =>", course.instructor);


    // ================= VALIDATION =================
    if (!user || !course) {

      return res.status(404).json({

        success: false,

        message:
          "Data not found ❌",
      });
    }


    // ==================================================
    // ❌ DELETE OLD CERTIFICATE
    // (FOR DEVELOPMENT / TESTING)
    // ==================================================
    await Certificate.deleteMany({

      studentId: user._id,

      courseId: course._id,
    });


    // ================= UNIQUE CERTIFICATE ID =================
    const certId =
      "EDUAI-" +
      Math.floor(
        100000 + Math.random() * 900000
      );


    console.log(
      "Instructor Name:",
      course.instructor?.name
    );


    // ================= GENERATE CERTIFICATE =================
    const certificate =
      await Certificate.create({


        // ================= STUDENT =================
        studentId:
          user._id,

        studentName:
          user?.name ||

          `${user?.firstName || ""}
           ${user?.lastName || ""}`
            .trim() ||

          "Student",


        // ================= COURSE =================
        courseId:
          course._id,

        courseName:
          course.title,


        // ================= TEACHER =================
        instructorName:
          course.instructor?.name ||
          "EduAI Instructor",


        // ================= CERTIFICATE =================
        certificateId:
          certId,


        // ================= DATE =================
        completionDate:
          new Date(),
      });


    // ================= RESPONSE =================
    res.status(201).json({

      success: true,

      certificate,
    });

  } catch (error) {

    console.error(
      "CERTIFICATE ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Certificate generation failed ❌",
    });
  }
};