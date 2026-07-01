import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

export const sendEmail = async (toEmail, subject, htmlContent) => {
  try {
    const safeEmail =
      typeof toEmail === "string" ? toEmail.trim() : "";

    if (!safeEmail || !safeEmail.includes("@")) {
      throw new Error("Invalid email address");
    }

    await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "EduAI Nexus",
        email: process.env.EMAIL_FROM,
      },

      to: [
        {
          email: safeEmail,
        },
      ],

      subject,

      htmlContent,
    });

    console.log("✅ OTP email sent successfully");
  } catch (err) {
    console.error("❌ Brevo Email Error:", err);
    throw err;
  }
};