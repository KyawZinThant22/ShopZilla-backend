import { UserModel } from "../model";
import { Request, Response } from "express";
import { Error } from "mongoose";

interface IRegister {
  userName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

///Register
const register = async (req: Request, res: Response) => {
  const body: IRegister = req.body;
  const User = new UserModel({
    userName: body.userName,
    email: body.email,
    password: body.password,
  });
  try {
    const savedUser = await User.save();
    res.status(201).json({
      status: "success",
      savedUser,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const authController = { register };
