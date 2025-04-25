// import { log } from "node:console";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("monog db connected successfully");
  } catch (error) {
    console.error("connection faild", error);
    process.exit(1);
  }
};
export default connectDB;
