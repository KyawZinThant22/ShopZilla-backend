import { UserModel } from "../model";
import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../@types/Express";

const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  const authHeader: any = req.headers.token;
  if (authHeader) {
    let token = authHeader.split(" ")[1];
    Jwt.verify(token, process.env.SEC_KEY as string, (err: any, user: any) => {
      console.log(err);
      if (err) {
        res.status(403).json({
          status: "fail",
          message: err.message,
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({
      status: "fail",
      message: "You are not authenticated!",
    });
  }
};

const verifyTokenAndAuthorization = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user?.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        status: "fail",
        message: "You are not allowed to do that",
      });
    }
  });
};

const verifyTokenAndAdmin = (req: any, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        status: "fail",
        message: "You are not allowed to do that",
      });
    }
  });
};

export const authMiddleware = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
