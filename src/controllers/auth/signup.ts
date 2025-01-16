import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { user_schema } from "../../validator/user";
import APIResponse from "../../validator/apiresponse/index";
import findExistingUser from "../../lib/user/existinguser/index";
import sendVerificationEmail from "../../lib/user/sentverificationemail/index";
import createUser from "../../lib/user/createuser/index";
import rateLimiter from "../../middleware/rateLimiter/reateLimiter";
import UserModel from "../../models/user";

const signUp: RequestHandler = async (req, res, next) => {
  const response: APIResponse = {
    message: "Failed to create a user",
    status: false,
  };

  try {

    const validBody = user_schema.parse(req.body);

    const existingUser = await findExistingUser(validBody.email);

    if (existingUser) {
      if (!existingUser.isVerified) {
        response.message = "Verification email already sent. Please verify your account.";
        response.status = true;
        return res.status(200).json(response); 
      }
      response.message = "User already exists. Please log in.";
      response.status = true;
      return res.status(200).json(response); 
    }

    const saltRounds = 12; 
    validBody.password = await bcrypt.hash(validBody.password, saltRounds);

    const verificationCode = Math.random().toString(36).substring(2, 15);

    const hashedCode = await bcrypt.hash(verificationCode, 10);

    const newUser = await UserModel.create({
      ...validBody,
      verification_Code: hashedCode,
    });

    await sendVerificationEmail(newUser.email, verificationCode);

    const backendUrl = process.env["BACKEND_URL"]!;
    const emailVerificationLink = `${backendUrl}/auth/verify-email/${verificationCode}`;

    response.status = true;
    response.message = "User signup successful. Please verify your email.";
    response.data = {
      email_verification_link: emailVerificationLink,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error during signup:", error);

    if (error instanceof Error && error.name === "ZodError") {
      response.message = "Invalid input. Please check your data.";
      response.error = (error as any).errors; 
    } else {
      response.message = "An internal server error occurred.";
      response.error = error; 
    }

    return res.status(500).json(response);
  }
};

export default signUp;
