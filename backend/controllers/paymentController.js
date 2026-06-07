import Razorpay from "razorpay";
import Course from "../models/Course.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Notification from "../models/Notification.js";
import bcrypt from "bcryptjs";


// ==========================
// 💳 CREATE ORDER
// ==========================
export const createOrder = async (req, res) => {

  try {

    const razorpay =
      new Razorpay({

        key_id:
          process.env.RAZORPAY_KEY_ID,

        key_secret:
          process.env.RAZORPAY_KEY_SECRET,
      });

    const {
      amount,
      courseId,
    } = req.body;


    // ✅ VALIDATION
    if (!amount || !courseId) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid data ❌",
      });
    }


    const order =
      await razorpay.orders.create({

        amount:
          amount * 100,

        currency: "INR",

        receipt:
          "receipt_" +
          Date.now(),
      });


    return res.status(200).json({

      success: true,

      order,
    });

  } catch (error) {

    console.error(
      "CREATE ORDER ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Order failed ❌",
    });
  }
};


// ==========================
// ✅ VERIFY PAYMENT + ENROLL
// ==========================
export const verifyPayment =
  async (req, res) => {

    try {

      const {
        courseId,
        password,
      } = req.body;

      const userId =
        req.user._id;


      // ==========================
      // FIND COURSE
      // ==========================
      const course =
        await Course.findById(
          courseId
        );

      if (!course) {

        return res.status(404).json({

          success: false,

          message:
            "Course not found ❌",
        });
      }


      // ==========================
      // DEBUG LOGS
      // ==========================
      console.log(
        "COURSE DATA:",
        course
      );

      console.log(
        "INSTRUCTOR:",
        course.instructor
      );


      // ==========================
      // COURSE PRICE
      // ==========================
      const amount =
        course.price;


      // ==========================
      // ENSURE ARRAY EXISTS
      // ==========================
      if (
        !Array.isArray(
          course.students
        )
      ) {

        course.students = [];
      }


      // ==========================
      // CHECK ENROLLMENT
      // ==========================
      const alreadyEnrolled =
        course.students.some(

          (id) =>

            id.toString() ===
            userId.toString()
        );


      // ==========================
      // ENROLL STUDENT
      // ==========================
      if (!alreadyEnrolled) {

        course.students.push(
          userId
        );

        await course.save();
      }


      // ==========================
      // SAVE PASSWORD
      // ==========================
      if (
        password &&
        password.trim() !== ""
      ) {

        const user =
          await User.findById(
            userId
          );

        if (user) {

          user.password =
            await bcrypt.hash(
              password,
              10
            );

          await user.save();
        }
      }


      // ==========================
      // REVENUE SPLIT
      // ==========================
      const teacherRevenue =
        amount * 0.7;

      const adminRevenue =
        amount * 0.3;


      // ==========================
      // DEBUG LOG
      // ==========================
      console.log(
        "teacherId:",
        course.instructor
      );


      // ==========================
      // SAVE TRANSACTION
      // ==========================
      await Transaction.create({

        studentId:
          userId,

        teacherId:
          course.instructor,

        courseId,

        amount,

        teacherRevenue,

        adminRevenue,

        paymentStatus:
          "paid",
      });

      // ==========================
      // CREATE NOTIFICATION
      // ==========================
      await Notification.create({

        title: "New Enrollment",

        message:
          `${req.user.name} enrolled in ${course.title}`,

        type: "enrollment",

        userId: userId,
      });

      // ==========================
      // SUCCESS
      // ==========================
      return res.status(200).json({

        success: true,

        message:
          alreadyEnrolled
            ? "Already enrolled ✅"
            : "Enrolled successfully 🎉",
      });

    } catch (error) {

      console.error(
        "VERIFY PAYMENT ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Enrollment failed ❌",
      });
    }
  };