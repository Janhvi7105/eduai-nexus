import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { createTransporter } from "../config/email.js";

// 🔐 TEMP OTP STORE
let otpStore = {};

// ==========================
// 📩 SEND OTP
// ==========================
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required ❌",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    console.log(`📩 OTP for ${email}: ${otp}`);

    const transporter = createTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <h2>Your OTP</h2>
        <h1>${otp}</h1>
        <p>Valid for 5 minutes</p>
      `,
    });

    res.json({
      success: true,
      message: "OTP sent successfully ✅",
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP ❌",
    });
  }
};

// ==========================
// 🔐 VERIFY OTP
// ==========================
export const verifyOTP = async (req, res) => {
  try {
    const { name, email, phone, otp } = req.body;

    const stored = otpStore[email];

    if (!stored) {
      return res.status(400).json({
        success: false,
        message: "OTP not found ❌",
      });
    }

    if (Date.now() > stored.expiresAt) {
      delete otpStore[email];
      return res.status(400).json({
        success: false,
        message: "OTP expired ❌",
      });
    }

    if (String(stored.otp) !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP ❌",
      });
    }

    delete otpStore[email];

    let user = await User.findOne({ email });

    // ==========================
    // CREATE STUDENT IF NOT EXISTS
    // ==========================
    if (!user) {
      user = await User.create({
        name,
        email,
        phone,
        password: await bcrypt.hash("temp_user", 10),
        role: "student",
        isApproved: true,
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "OTP verification failed ❌",
    });
  }
};

// ==========================
// 🔑 LOGIN USER
// ==========================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found ❌",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password ❌",
      });
    }

    // =====================================
    // 👨‍🏫 TEACHER APPROVAL CHECK
    // =====================================
    if (user.role === "teacher" && !user.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Waiting for admin approval ⏳",
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
};

// ==========================
// 👨‍🏫 REGISTER TEACHER
// ==========================
export const registerTeacher = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required ❌",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists ❌",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // =====================================
    // 👨‍🏫 CREATE PENDING TEACHER
    // =====================================
    const teacher = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "teacher",
      isApproved: false,
    });

    // ✅ STEP 1: Generate token for the teacher
    const token = generateToken(teacher._id);

    // ✅ STEP 2: Return token along with user data
    res.status(201).json({
      success: true,
      message: "Instructor request submitted successfully ⏳ Waiting for admin approval.",
      user: teacher,
      token,
    });
  } catch (error) {
    console.error("REGISTER TEACHER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
};

// ==========================
// 🔥 SET PASSWORD
// ==========================
export const setUserPassword = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await User.findById(req.user._id);

    user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.json({
      success: true,
      message: "Password set successfully ✅",
    });
  } catch (error) {
    console.error("SET PASSWORD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to set password ❌",
    });
  }
};