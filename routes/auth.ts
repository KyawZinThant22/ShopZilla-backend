import { Router } from "express";
import { authController } from "../controller/authController";

const router = Router();

//REGISTER

router.post("/register", authController.register);

export default router;
