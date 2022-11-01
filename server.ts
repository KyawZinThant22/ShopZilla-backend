import mongoose from "mongoose";
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
import app from ".";

const DB = process.env.DATABASE!.replace("<PASSWORD>", process.env.PASSWORD!);
const PORT = process.env.PORT;

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

app.listen(PORT || 8000, () => {
  console.log("backend server running");
});
