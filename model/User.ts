import mongoose, { HydratedDocument, Model } from "mongoose";
import validator from "validator";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

import { IRegister } from "../@types/auth";

interface IUser {
  userName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

interface UserModel extends Model<IUser, {}, IRegister> {
  register(data: IRegister): Promise<HydratedDocument<IUser, IRegister>>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    userName: {
      type: String,
      required: [true, "UserName is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "A password must have atleast 6 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.statics.register = async function (data: IRegister) {
  const { email, password, userName } = data;
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, userName, password: hash });

  return user;
};

const UserModel = mongoose.model<IUser, UserModel>("User", UserSchema);

export default UserModel;
