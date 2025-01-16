// src/routes/resetPassword.ts

import { RequestHandler } from "express";
import APIResponse from '../../validator/apiresponse/index';
import { reset_Password_Schema } from "../../validator/user";
import UserModel from "../../models/user";
import bcrypt from "bcrypt";

const resetPassword: RequestHandler = async (req, res) => {
  const response: APIResponse = {
    message: "Failed to reset password",
    status: false,
  };

  try {
    const { email, resetToken, newPassword } = reset_Password_Schema.parse(
      req.body
    );

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await UserModel.findOne({
      email,
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      response.message = "Invalid or expired reset token";
      return res.status(200).json(response);
    }

    if (newPassword) {
      user.password = hashedPassword; 
    }

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    response.message = "Password reset successfully";
    response.status = true; 
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json(response); 
  }
};

export default resetPassword;