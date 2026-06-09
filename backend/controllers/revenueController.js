import Transaction from "../models/Transaction.js";


// =======================================
// TEACHER REVENUE
// =======================================
export const getTeacherRevenue = async (req, res) => {
  try {

    const transactions =
      await Transaction.find({
        teacherId: req.user._id,
      });

    const revenue =
      transactions.reduce(
        (sum, t) => sum + t.teacherRevenue,
        0
      );

    res.status(200).json({
      success: true,
      revenue,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// =======================================
// ADMIN REVENUE
// =======================================
export const getAdminRevenue =
  async (req, res) => {

    try {

      const transactions =
        await Transaction.find()

        .populate(
          "courseId",
          "title"
        )

        .populate(
          "studentId",
          "name"
        );

      const totalRevenue =
        transactions.reduce(

          (acc, item) =>

            acc +
            item.adminRevenue,

          0
        );

      const totalTransactions =
        transactions.length;

      res.json({

        success: true,

        totalRevenue,

        totalTransactions,

        transactions,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch revenue",
      });
    }
  };