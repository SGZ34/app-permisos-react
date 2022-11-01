import { Router } from "express";
import {
  login,
  register,
  revalidateToken,
  logout,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema } from "../schemas/login.js";
import { registerSchema } from "../schemas/register.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/register", validateSchema(registerSchema), register);
router.get("/renew", verifyToken, revalidateToken);
router.get("/logout", verifyToken, logout);

export default router;
