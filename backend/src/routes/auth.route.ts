// src/routes/auth.routes.ts
import { Router } from "express";
import { login, logout, me, signup } from "../controllers/user.controller";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", isAuth, me);
router.post("/logout", logout);

export default router;
