import { Router } from "express";
import { authController } from "../controller/authController";
import { authMiddleware } from "../middleware";

const router = Router();

//REGISTER

router.post("/register", authController.register);
router.post("/login", authController.Login);

router.post(
  "/validate",
  authMiddleware.verifyToken,
  authController.accountValidate
);
export default router;
