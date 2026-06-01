import mongoose from "mongoose";

const transactionSchema =
  new mongoose.Schema(

    {

      // 👨‍🎓 STUDENT
      studentId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      // 👨‍🏫 TEACHER
      teacherId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      // 📚 COURSE
      courseId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Course",

        required: true,
      },

      // 💰 TOTAL AMOUNT
      amount: {

        type: Number,

        required: true,
      },

      // 👨‍🏫 TEACHER SHARE
      teacherRevenue: {

        type: Number,

        required: true,
      },

      // 👑 ADMIN SHARE
      adminRevenue: {

        type: Number,

        required: true,
      },

      // 💳 STATUS
      paymentStatus: {

        type: String,

        default: "paid",
      },

    },

    {
      timestamps: true,
    }
  );

const Transaction =
  mongoose.model(

    "Transaction",

    transactionSchema
  );

export default Transaction;