import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";
import { COOKIE_NAME } from "../utils/session";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorised" });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { userId: string }; // We are telling TypeScript: "Treat this payload as an object that contains a userId property of type string."
    req.userId = payload.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Please sign in again" });
  }
};
