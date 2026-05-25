import dotenv from "dotenv";
dotenv.config(); // ✅ MUST BE FIRST

import app from "./app.js";
import connectDB from "./config/db.js";


// ================= IMPORT ROUTES =================
import authRoutes from "./routes/authRoutes.js";

import enrollmentRoutes from "./routes/enrollmentRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";

import courseRoutes from "./routes/courseRoutes.js";

import userRoutes from "./routes/userRoutes.js";

import progressRoutes from "./routes/progressRoutes.js";


// 🔔 NOTIFICATIONS
import notificationRoutes
from "./routes/notificationRoutes.js";


// 📜 CERTIFICATES
import certificateRoutes
from "./routes/certificateRoutes.js";


// 📝 MOCK TEST
import mockTestRoutes
from "./routes/mockTestRoutes.js";


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


// ================= INIT =================

// ✅ CONNECT DATABASE
connectDB();


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


// ================= HEALTH CHECK =================
app.get("/", (req, res) => {

  res.send(
    "🚀 EduAI Nexus Backend Running"
  );
});


// ================= ERROR HANDLER =================
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


// ================= SERVER START =================
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});