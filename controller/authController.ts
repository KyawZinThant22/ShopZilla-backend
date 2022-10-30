import { UserModel } from "../model";
import { Request, Response } from "express";
import { Error } from "mongoose";
import { IRegister } from "../@types/auth";

///Register
const register = async (req: Request, res: Response) => {
  const body: IRegister = req.body;

  try {
    // const savedUser = await UserModel.register(body.email,body.password,body.userName)
    const savedUser = await UserModel.register(body);
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
