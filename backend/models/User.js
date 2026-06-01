import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(

    {

      // ================= 🔹 BASIC INFO =================
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
        minlength: 6,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },


      // ================= 🔹 ROLE =================
      role: {
        type: String,
        enum: [
          "student",
          "teacher",
          "admin",
        ],
        default: "student",
      },


      // ================= ✅ TEACHER APPROVAL =================
      isApproved: {
        type: Boolean,
        default: false,
      },


      // ================= 🔥 PROFESSIONAL PROFILE =================
      firstName: {
        type: String,
        default: "",
        trim: true,
      },

      lastName: {
        type: String,
        default: "",
        trim: true,
      },

      city: {
        type: String,
        default: "",
        trim: true,
      },


      // ================= 👨‍🏫 TEACHER INFO =================

      // ✅ BIO
      bio: {
        type: String,
        default: "",
        trim: true,
      },

      // ✅ SKILLS
      skills: {
        type: String,
        default: "",
        trim: true,
      },

      // ✅ EXPERIENCE
      experience: {
        type: String,
        default: "",
        trim: true,
      },


      // ================= 🖼 PROFILE IMAGE =================
      profileImage: {
        type: String,
        default: "",
      },


      // ================= 🌐 SOCIAL LINKS =================
      linkedin: {
        type: String,
        default: "",
        trim: true,
      },

      github: {
        type: String,
        default: "",
        trim: true,
      },

      portfolio: {
        type: String,
        default: "",
        trim: true,
      },


      // ================= 🚀 TEACHER ONBOARDING =================
      onboarding: {

        teaching: {
          type: String,
          default: "",
        },

        video: {
          type: String,
          default: "",
        },

        audience: {
          type: String,
          default: "",
        },
      },

      onboardingCompleted: {
        type: Boolean,
        default: false,
      },


      // ================= 📚 ENROLLED COURSES =================
      enrolledCourses: [

        {
          type:
            mongoose.Schema.Types.ObjectId,

          ref: "Course",
        },
      ],


      // ================= 🎯 PROGRESS TRACKING =================
      progress: [

        {

          courseId: {

            type:
              mongoose.Schema.Types.ObjectId,

            ref: "Course",
          },

          lectureIndex: {
            type: Number,
            default: 0,
          },

          watchedTime: {
            type: Number,
            default: 0,
          },

          completed: {
            type: Boolean,
            default: false,
          },
        },
      ],


      // ================= 🔐 OTP =================
      otp: {
        type: String,
      },

      otpExpiry: {
        type: Date,
      },

    },

    {
      timestamps: true,
    }
  );


// ================= MODEL =================
const User = mongoose.model(
  "User",
  userSchema
);

export default User;