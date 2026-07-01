import Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendEmail = async (to, subject, htmlContent) => {
  const email = {
    sender: {
      name: "EduAI Nexus",
      email: process.env.EMAIL_FROM,
    },
    to: [
      {
        email: to,
      },
    ],
    subject,
    htmlContent,
  };

  return await apiInstance.sendTransacEmail(email);
};