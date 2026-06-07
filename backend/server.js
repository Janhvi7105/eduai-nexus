import dotenv from "dotenv";
dotenv.config(); // ✅ MUST BE FIRST

console.log("GEMINI =", process.env.GEMINI_API_KEY);

import express from "express";
import path from "path";
import app from "./app.js";

import connectDB
from "./config/db.js";


// ================= IMPORT ROUTES =================

// 🔐 AUTH
import authRoutes
from "./routes/authRoutes.js";

// 🎓 ENROLLMENT
import enrollmentRoutes
from "./routes/enrollmentRoutes.js";

// 💳 PAYMENT
import paymentRoutes
from "./routes/paymentRoutes.js";

// 💰 REVENUE
import revenueRoutes
from "./routes/revenueRoutes.js";

// 📚 COURSES
import courseRoutes
from "./routes/courseRoutes.js";

// 👤 USER
import userRoutes
from "./routes/userRoutes.js";

// 📊 PROGRESS
import progressRoutes
from "./routes/progressRoutes.js";

// 🔔 NOTIFICATIONS
import notificationRoutes
from "./routes/notificationRoutes.js";

// 📜 CERTIFICATES
import certificateRoutes
from "./routes/certificateRoutes.js";

// 📝 MOCK TEST
import mockTestRoutes
from "./routes/mockTestRoutes.js";

// 👑 ADMIN USERS
import adminRoutes
from "./routes/adminRoutes.js";

// 📚 ADMIN COURSES
import courseAdminRoutes
from "./routes/courseAdminRoutes.js";

// 📖 NOTES
import noteRoutes
from "./routes/noteRoutes.js";

// 🤖 CHATBOT - ADD THIS LINE
import chatbotRoutes from "./routes/chatbotRoutes.js";


// ================= DEBUG LOGS =================
console.log(
  "📧 EMAIL USER:",
  process.env.EMAIL_USER || "Not Set ❌"
);

console.log(
  "🔐 EMAIL PASS:",
  process.env.EMAIL_PASS
    ? "Loaded ✅"
    : "Missing ❌"
);

console.log(
  "💳 RAZORPAY KEY:",
  process.env.RAZORPAY_KEY_ID
    ? "Loaded ✅"
    : "Missing ❌"
);


// ================= CONNECT DATABASE =================
connectDB();

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads"),
    {
      setHeaders: (res) => {
        res.setHeader(
          "Content-Disposition",
          "attachment"
        );
      },
    }
  )
);


// ================= ROUTES =================

// 🔐 AUTH
app.use(
  "/api/auth",
  authRoutes
);


// 📚 COURSES
app.use(
  "/api/courses",
  courseRoutes
);


// 💳 PAYMENT
app.use(
  "/api/payment",
  paymentRoutes
);


// 💰 REVENUE
app.use(
  "/api/revenue",
  revenueRoutes
);


// 🎓 ENROLLMENT
app.use(
  "/api/enroll",
  enrollmentRoutes
);


// 👤 USER
app.use(
  "/api/user",
  userRoutes
);


// 📊 PROGRESS
app.use(
  "/api/progress",
  progressRoutes
);


// 🔔 NOTIFICATIONS
app.use(
  "/api/notifications",
  notificationRoutes
);


// 📜 CERTIFICATES
app.use(
  "/api/certificate",
  certificateRoutes
);


// 📝 MOCK TEST
app.use(
  "/api/mocktest",
  mockTestRoutes
);


// 📖 NOTES
app.use(
  "/api/notes",
  noteRoutes
);

// 🤖 CHATBOT - ADD THIS LINE
app.use("/api/chatbot", chatbotRoutes);


// 👑 ADMIN USER MANAGEMENT
app.use(
  "/api/admin",
  adminRoutes
);


// 📚 ADMIN COURSE MANAGEMENT
app.use(
  "/api/admin/courses",
  courseAdminRoutes
);


// ================= HEALTH CHECK =================
app.get("/", (req, res) => {

  res.send(
    "🚀 EduAI Nexus Backend Running"
  );
});


// ================= GLOBAL ERROR HANDLER =================
app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.error(
      "❌ GLOBAL ERROR:",
      err.stack
    );

    res.status(500).json({

      success: false,

      message:
        err.message ||
        "Something went wrong ❌",
    });
  }
);


// ================= SERVER =================
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});