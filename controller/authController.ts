import { UserModel } from "../model";
import { Request, Response } from "express";
import { ILogin, IRegister } from "../@types/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SEC_KEY = process.env.SEC_KEY;

// const createToken = (id: number | string, isAdmin: boolean) => {
//   return jwt.sign({ id, isAdmin }, SEC_KEY, {
//     expiresIn: "120",
//   });
// };

const createToken = (id: number | string, isAdmin: boolean | undefined) => {
  return jwt.sign({ id, isAdmin }, SEC_KEY as string, {
    expiresIn: "120",
  });
};
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
      id: savedUser.id,
      token: createToken(savedUser.id, savedUser.isAdmin),
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
        id: user.id,
        token: createToken(user.id, user.isAdmin),
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
