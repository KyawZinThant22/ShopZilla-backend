import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./routes";

dotenv.config({ path: "./.env" });
const app: Express = express();

const DB = process.env.DATABASE!.replace("<PASSWORD>", process.env.PASSWORD!);
const PORT = process.env.PORT;

app.use(express.json());

mongoose
  .connect(DB)
  .then(() => console.log("DbConnection Successful"))
  .catch((error) => {
    console.log(error);
  });

app.use("/api/user", userRouter);

app.listen(PORT || 8000, () => {
  console.log("backend server running");
});
