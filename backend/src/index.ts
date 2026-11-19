import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./lib/db";
import authRoutes from "./routes/auth.route";
import cookieParser from "cookie-parser";
import { env } from "./lib/env";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
