// src/routes/validateOtp.ts

import { RequestHandler } from "express";
import APIResponse from '../../validator/apiresponse/index'
import UserModel from "../../models/user";
import { reset_Password_otp_Schema } from "../../validator/user";

const validateOtp: RequestHandler = async (req, res) => {
  const response: APIResponse = {
    message: "OTP validation failed",
    status: false,
  };

  const { email, resetToken } = reset_Password_otp_Schema.parse(req.body); 
  try {
    const user = await UserModel.findOne({
      email,
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: new Date() }, 
    });

    if (!user) {
      response.message = "Invalid or expired reset token";
      return res.status(200).json(response); 
    }

    response.message = "OTP is valid";
    response.status = true; 
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json(response);
  }
};

export default validateOtp;