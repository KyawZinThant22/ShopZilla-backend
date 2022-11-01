import { UserModel } from "../model";
import { Request, Response } from "express";
import { Error } from "mongoose";
import { ILogin, IRegister } from "../@types/auth";
import bcrypt from "bcrypt";

///Register

// @desc Register new user
// @route POST /auth/register
// @access Public
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

// @desc Login user
// @route POST /auth/login
// @access Public
const Login = async (req: Request, res: Response) => {
  const { email, password }: ILogin = req.body;

  //check user exist or not
  const user = await UserModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      status: "success",
      data: {
        userName: user.userName,
        id: user.id,
        email: user.email,
      },
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "Invalid credentials",
    });
  }
};

export const authController = { register, Login };
