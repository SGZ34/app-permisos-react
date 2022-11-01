import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import usersRoutes from "./routes/users.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/users", usersRoutes);

export default app;
