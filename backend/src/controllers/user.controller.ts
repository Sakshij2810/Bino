import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { signinSchema, signupSchema } from "../utils/validation";
import User from "../models/user.model";
import { clearSession, createSession } from "../utils/session";
import { sendWelcomeEmail } from "../lib/email";

export const signup = async (req: Request, res: Response) => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ success: false, message: "Invalid Input" });
    }

    const { username, email, password } = result.data;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, password is required.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const welcomeEmail = await sendWelcomeEmail(user.email, user.username);

    createSession(res, user.id);
    res.status(201).json({
      success: true,
      user: { id: user.id, username: user.username, email: user.email },
      welcomeEmail,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ success: false, message: "Invalid Input" });
    }

    const { email, password } = result.data;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, password is required.",
      });
    }

    const user = await User.findOne({ email }).select("+password"); // .select("+password") is a Mongoose query method that tells MongoDB to include the password field in the returned document, even if that field is normally excluded by default.

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // const isMatch = await bcrypt.compare(password, user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    createSession(res, user.id);

    res.json({
      success: true,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    clearSession(res);
    res.json({ message: "Signed out" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      clearSession(res);
      return res.status(401).json({ message: "Please sign in again" });
    }

    res.json({
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
