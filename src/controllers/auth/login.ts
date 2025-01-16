import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { login_user_schema } from '../../validator/user/index';
import APIResponse from '../../validator/apiresponse/index';
import findExistingUser from '../../lib/user/existinguser/index';

const LogIn: RequestHandler = async (req, res) => {
  const response: APIResponse = { message: "Failed to log in", status: false };

  try {
    const validBody = login_user_schema.parse(req.body);

    const existingUser = await findExistingUser(validBody.email);

    if (!existingUser) {
      response.message = "User not found";
      return res.status(404).json(response);
    }

    if (!existingUser.isVerified) {
      response.message = "Account not verified. Please verify your email.";
      return res.status(403).json(response);
    }

    const isPasswordValid = await bcrypt.compare(validBody.password, existingUser.password);
    if (!isPasswordValid) {
      response.message = "Invalid email or password";
      return res.status(401).json(response);
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return res.status(500).json({ error: "JWT secret key is not defined" });
    }

    const generateToken = (user: any) => jwt.sign(
      { username: user.username, email: user.email },
      secretKey,
      { expiresIn: "1h" } 
    );

    response.message = "Login successful";
    response.status = true;
    response.data = {
      user: {
        username: existingUser.username,
        email: existingUser.email,
      },
      token: generateToken(existingUser),
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error("Error during login:", error);
    response.message = "An error occurred during login";
    return res.status(500).json(response);
  }
};

export default LogIn;
