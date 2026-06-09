import Notification from "../models/Notification.js";

export const getNotifications =
  async (req, res) => {

    try {

      const notifications =
        await Notification.find()
          .sort({ createdAt: -1 })
          .limit(10);

      res.json({
        success: true,
        notifications,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

export const markAsRead = async (req, res) => {
  try {
    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { new: true }
      );

    res.json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};