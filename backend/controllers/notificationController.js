import Notification from "../models/Notification.js";


// =====================================
// 🔔 GET NOTIFICATIONS
// =====================================
export const getNotifications = async (
  req,
  res
) => {

  try {

    const notifications =
      await Notification.find({
        userId: req.user._id,
      })
        .sort({ createdAt: -1 });

    return res.status(200).json({

      success: true,

      notifications,
    });

  } catch (error) {

    console.error(
      "NOTIFICATION ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server Error ❌",
    });
  }
};


// =====================================
// ✅ MARK AS READ
// =====================================
export const markAsRead = async (
  req,
  res
) => {

  try {

    const notification =
      await Notification.findById(
        req.params.id
      );

    if (!notification) {

      return res.status(404).json({

        success: false,

        message:
          "Notification not found ❌",
      });
    }

    notification.read = true;

    await notification.save();

    return res.status(200).json({

      success: true,

      message:
        "Notification marked as read ✅",
    });

  } catch (error) {

    console.error(
      "MARK READ ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server Error ❌",
    });
  }
};