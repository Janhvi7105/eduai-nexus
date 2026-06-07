import mongoose from "mongoose";

// ===============================
// 🎥 LECTURE SCHEMA
// ===============================
const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    videoUrl: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      default: "",
    },

    isFree: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


// ===============================
// 📚 SECTION SCHEMA
// ===============================
const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    lectures: {
      type: [lectureSchema],
      default: [],
    },
  },
  { timestamps: true }
);


// ===============================
// 🎓 COURSE SCHEMA
// ===============================
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    sections: {
      type: [sectionSchema],
      default: [],
    },

    totalLectures: {
      type: Number,
      default: 0,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    // ===============================
    // ✅ ADMIN APPROVAL
    // ===============================
    approved: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // ⭐ FEATURED COURSE
    // ===============================
    featured: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // ⭐ COURSE RATING
    // ===============================
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


// ===============================
// 👨‍🎓 TOTAL STUDENTS VIRTUAL
// ===============================
courseSchema.virtual(
  "studentsCount"
).get(function () {
  return this.students?.length || 0;
});


// ===============================
// 🔥 AUTO UPDATE TOTAL LECTURES
// ===============================
courseSchema.pre(
  "save",
  async function () {

    let count = 0;

    if (this.sections?.length > 0) {

      this.sections.forEach(
        (section) => {

          count +=
            section.lectures?.length || 0;
        }
      );
    }

    this.totalLectures = count;
  }
);


// ===============================
// 🚀 EXPORT
// ===============================
const Course = mongoose.model(
  "Course",
  courseSchema
);

export default Course;