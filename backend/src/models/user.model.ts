// src/models/user.model.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true }, // trim: true => automatically removes whitespace from the beginning and end of a string before saving it to MongoDB
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false }, // select: false, the password is excluded from response object (This helps prevent accidentally exposing password hashes when fetching user information.)
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
