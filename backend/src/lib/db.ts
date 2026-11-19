import mongoose from "mongoose";
import { env } from "./env";

const dbUrl = env.MONGODB_URI;

export const connectDB = async () => {
  if (!dbUrl) {
    console.log("MONGODB_URL not found");
    return;
  }

  try {
    await mongoose.connect(dbUrl);
    console.log("DB connected successfully.");
  } catch (error) {
    console.log("DB error: ", error);
  }
};

export default connectDB;
