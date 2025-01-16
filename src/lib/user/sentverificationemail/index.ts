import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

async function sendVerificationEmail(email: string, verificationCode: string): Promise<string> {
  const resend_api = process.env["RESEND_API"]!;
  const resend = new Resend(resend_api);
  const url = process.env["BACKEND_URL"]!;
  console.log("backend url", url);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
      <!-- Navbar -->
      <div style="background-color: #4CAF50; padding: 10px; text-align: center; color: white; font-size: 24px; font-weight: bold;">
        Welcome to Yes or Yes
      </div>

      <!-- Card -->
      <div style="background-color: white; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; color: #333;">Thank You for Signing Up!</h2>
       <p style="font-size: 16px; color: #555; text-align: center;">
          Welcome to <strong>Yes or Yes</strong>
        </p>
        
        <!-- Button -->
        <div style="text-align: center; margin: 20px;">
          <a href="${url}/auth/verify-email/${verificationCode}" 
             style="background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;">
            Verify Now
          </a>
        </div>

        <p style="font-size: 14px; color: #999; text-align: center; margin-top: 20px;">
          If you did not sign up for this account, please ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align: center; margin-top: 20px; color: #aaa; font-size: 12px;">
        &copy; ${new Date().getFullYear()} Yes Or Yes. All rights reserved.
      </div>
    </div>
  `;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify Your Account",
    html: htmlContent,
  });

  return verificationCode;
}

export default sendVerificationEmail;
