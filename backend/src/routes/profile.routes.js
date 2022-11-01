import { Router } from "express";
import {
  profile,
  updatePassword,
  updateProfile,
} from "../controllers/profile.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { updatePasswordSchema } from "../schemas/updatePassword.js";
const router = Router();

router.use(verifyToken);

router.get("/", profile);
router.put("/updateProfile", updateProfile);
router.put(
  "/updatePassword",
  validateSchema(updatePasswordSchema),
  updatePassword
);

export default router;
