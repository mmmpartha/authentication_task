import { RequestHandler } from "express";
import APIResponse from "../../validator/apiresponse";
import { forgot_Password_Schema } from "../../validator/user";
import UserModel from "../../models/user";
import dotenv from "dotenv";
import sendResetEmail from '../../lib/user/resetEmail/index'

dotenv.config();

const generateResetToken = () =>
  Math.floor(1000 + Math.random() * 9000).toString();

const forgotPassword: RequestHandler = async (req, res) => {
  const response: APIResponse = {
    message: "Failed to send forgot password",
    status: false,
  };

  const { email } = forgot_Password_Schema.parse(req.body);

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const currentTime = Date.now();
      const resetPasswordExpires = user.resetPasswordExpires?.getTime() || 0; 

      if (user.resetPasswordToken && resetPasswordExpires > currentTime) {
        response.status = true;
        response.message =
          "An OTP has already been sent. Please wait for it to expire before requesting a new one.";
        return res.status(200).json(response);
      }

      const resetToken = generateResetToken();
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = new Date(currentTime + 3600000); 
      await user.save();

      await sendResetEmail(user.email, resetToken);
      response.message = "Reset OTP sent to your email.";
      response.status = true;
      return res.status(200).json(response);
    } else {
      response.message = "User not found.";
      return res.status(200).json(response);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default forgotPassword;