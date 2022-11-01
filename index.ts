import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRouter, userRouter } from "./routes";

dotenv.config({ path: "./.env" });
const app: Express = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

export default app;
