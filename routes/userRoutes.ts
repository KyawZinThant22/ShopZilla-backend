import { Router } from "express";
import { Request, Response } from "express";
import { UserController } from "../controller";
import { authMiddleware } from "../middleware";

const router = Router();

//update
router.put(
  "/:id",
  authMiddleware.verifyTokenAndAuthorization,
  UserController.updateUser
);

//delete

router.delete(
  "/:id",
  authMiddleware.verifyTokenAndAuthorization,
  UserController.DeleteUser
);

//get user

router.get(
  "/find/:id",
  authMiddleware.verifyTokenAndAdmin,
  UserController.getUser
);

//get all user
router.get("/", authMiddleware.verifyTokenAndAdmin, UserController.getAllUser);

export default router;
