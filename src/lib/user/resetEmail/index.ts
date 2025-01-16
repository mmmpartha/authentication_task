import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend_api = process.env["RESEND_API"]!;
const resend = new Resend(resend_api);

const sendResetEmail = async (email: string, otp: string) => {
  // Public URL for your logo
  const logoUrl =
    "https://res.cloudinary.com/do9i5ypbl/image/upload/v1737010787/Untitled_design_gcoypm.png";

  // Inline CSS for better compatibility
  const resetPasswordHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh;">
        <div style="width: 100%; max-width: 400px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); text-align: center; padding: 30px;">
          <div style="margin-bottom: 20px;">
            <img src="${logoUrl}" alt="MyApp Logo" style="max-width: 120px; height: auto;" />
          </div>
          <h1 style="color: #007bff; margin: 0 0 15px; font-size: 24px;">Reset Password</h1>
          <p style="color: #333; margin-bottom: 10px; font-size: 16px;">An OTP has been sent to your email.</p>
          <div style="font-size: 32px; font-weight: bold; color: #007bff; background: #e7f3ff; padding: 10px 20px; border-radius: 8px; display: inline-block; margin: 20px 0;">
            Your OTP: ${otp}
          </div>
          <div style="font-size: 14px; color: #666; margin-top: 20px;">
            Please enter this OTP to reset your password. <br> OTP is valid for 1 hour.
          </div>
        </div>
      </body>
    </html>
  `;

  if (!email) throw new Error("Invalid email");

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Reset",
      html: resetPasswordHtml,
    });

    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email via Resend SMTP:", error);
    throw new Error("Failed to send email");
  }
};

export default sendResetEmail;
