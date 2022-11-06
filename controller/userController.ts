import { Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../model";

// @desc Update existing user
// @route POST /user/:id
// @access Private

const updateUser = async (req: any, res: Response) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// @desc Delete User
// @route POST /user/:id
// @access Private// @desc Update existing user
// @route POST /user/:id
// @access Private

const DeleteUser = async (req: any, res: Response) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "User has been successfully deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// @desc Get User
// @route POST /user/:id
// @access Private
const getUser = async (req: any, res: Response) => {
  try {
    const User = await UserModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: User,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// @desc Get All Users
// @route POST /user/:id
// @access Private
const getAllUser = async (req: any, res: Response) => {
  const query = req.query.new;
  try {
    const Users = query
      ? await UserModel.find().sort({ _id: -1 }).limit(2)
      : await UserModel.find();
    res.status(200).json({
      status: "success",
      results: Users.length,
      data: Users,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const UserController = { updateUser, DeleteUser, getUser, getAllUser };
