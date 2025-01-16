import { Request, Response } from "express";
import APIResponse from '../../validator/apiresponse/index'
import UserModel from "../../models/user";

const getAllUsers = async (req: Request, res: Response) => {
  const response: APIResponse = {
    message: "Failed to retrieve users",
    status: false,
  };

  try {
    const users = await UserModel.find(
      {
        role: {
          $in: ["admin", "user"], 
        },
      },
      "name email mobile_number state city district role" 
    );

    response.status = true;
    response.message = "Successfully retrieved users";
    response.data = users; 

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

export default getAllUsers;