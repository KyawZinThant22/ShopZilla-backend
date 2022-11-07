import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter, userRouter } from "./routes";

dotenv.config({ path: "./.env" });
const app: Express = express();
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

export default app;
