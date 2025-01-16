import { RequestHandler, Response, Request } from "express";
import APIResponse from '../../validator/apiresponse/index'
import UserModel from "../../models/user";
import UserType from "../../validator/user";
import { z } from "zod";
import bcrypt from "bcrypt";
import { profileUpdateSchema } from "../../validator/user";
import sendVerificationEmail from '../../lib/user/sentverificationemail/index'

const updateProfile: RequestHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response: APIResponse = {
    message: "Failed to update profile",
    status: false,
  };

  const profileId: string = req.params.id;

  console.log("profile id", profileId);
  console.log("profile data", req.body);

  try {
    const allowedFields = [
      "name",
      "email",
      "mobile_number",
      "password",
      "city",
      "district",
      "state",
      "role",
      "account_status",
      "account_status_description",
      "fcmToken",
      "isVerified",
      "battery_percentage",
      "start_work",
      "created_by",
      "created_by_name",
    ];

    const filteredData = Object.keys(req.body).reduce((acc, key) => {
      if (allowedFields.includes(key)) acc[key] = req.body[key];
      return acc;
    }, {} as Record<string, unknown>);

    console.log("filtered data", filteredData);

    const validatedData = profileUpdateSchema.strip().parse(filteredData);
    console.log("validated data", validatedData);

    const userId = req.params.id;
    if (!userId || userId !== profileId) {
      return res.status(403).json({ message: "Unauthorized", status: false });
    }

    if (validatedData.password) {
      const saltRounds = 10;
      validatedData.password = await bcrypt.hash(
        validatedData.password,
        saltRounds
      );
    }

    if (validatedData.email) {
      validatedData.isVerified = false;

      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      validatedData.verification_Code = verificationCode;

      await sendVerificationEmail(
        validatedData.email as string,
        verificationCode
      );
    }

    const updatedProfile: UserType | null = await UserModel.findByIdAndUpdate(
      profileId,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      response.message = "Profile not found";
      return res.status(404).json(response);
    }

    response.status = true;
    response.message = "Successfully updated profile";
    response.data = updatedProfile;

    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation Errors:", error.errors);
      return res.status(400).json({
        message: "Validation error",
        status: false,
        errors: error.errors,
      });
    }

    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

export default updateProfile;