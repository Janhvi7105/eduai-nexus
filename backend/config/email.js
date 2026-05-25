import nodemailer from "nodemailer";

// 🔥 Create transporter ONLY when needed
export const createTransporter = () => {
  console.log("EMAIL USER:", process.env.EMAIL_USER);
  console.log(
    "EMAIL PASS:",
    process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌"
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // ✅ App Password
    },
  });

  return transporter;
};