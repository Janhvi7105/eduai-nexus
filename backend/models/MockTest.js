import mongoose from "mongoose";

const questionSchema =
  new mongoose.Schema({

    question: {
      type: String,
      required: true,
    },

    options: [
      {
        type: String,
      },
    ],

    correctAnswer: {
      type: Number,
      required: true,
    },
  });

const mockTestSchema =
  new mongoose.Schema(

    {
      courseId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Course",

        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      questions: [
        questionSchema,
      ],
    },

    {
      timestamps: true,
    }
  );

const MockTest =
  mongoose.model(
    "MockTest",
    mockTestSchema
  );

export default MockTest;