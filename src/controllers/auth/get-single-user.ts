import { Request, Response, NextFunction } from "express";
import APIResponse from '../../validator/apiresponse/index'
import UserModel from "../../models/user";

const getAllSingleUsers = async (req: Request, res: Response) => {
  const response: APIResponse = {
    message: "Failed to retrieve Users",
    status: false,
  };

  const { id } = req.params;

  try {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      response.message = "No Users found";
    } else {
      response.status = true;
      response.message = "Successfully retrieved Users";
      response.data = user;
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

export default getAllSingleUsers;