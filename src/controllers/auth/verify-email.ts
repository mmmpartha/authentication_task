import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../models/user";
import APIResponse from "../../validator/apiresponse";
import { StatusCodes } from "http-status-codes";

const verifyEmail: RequestHandler = async (req, res) => {
  const response: APIResponse = {
    message: "Failed to verify email",
    status: false,
  };

  try {
    const token = req.params.token;

    if (!token) {
      response.message = "Token not found in request parameters.";
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    console.log("Token received:", token);

    const user = await UserModel.findOne({ verification_Code: { $exists: true } });

    if (!user || !user.verification_Code) {
      console.log("User not found or verification code is invalid.");
      return res.redirect('/auth/already-verified'); 
    }

    console.log("Stored hashed code in DB:", user.verification_Code);

    if (user.isVerified) {
      console.log("User is already verified.");
      return res.redirect('/auth/already-verified'); 
    }

    const verificationCode = user.verification_Code;
    const isMatch = verificationCode && await bcrypt.compare(token, verificationCode);

    if (!isMatch) {
      console.log("Invalid or expired verification code.");
      return res.redirect('/auth/invalid-token');
    }

    await UserModel.updateOne(
      { _id: user._id },
      {
        $set: {
          isVerified: true,
          verification_Code: null, 
          account_status: "active", 
        },
      }
    );

    console.log("User verification successful.");

    return res.redirect('/auth/verify-success');
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    response.message = "An internal server error occurred.";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

export default verifyEmail;
