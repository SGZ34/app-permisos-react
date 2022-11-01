import { Router } from "express";
import {
  getRoles,
  create,
  getPermissions,
} from "../controllers/roles.controller.js";
import { validatePermission } from "../middlewares/validatePermission.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createRol } from "../schemas/roles.js";

const router = Router();

router.use(verifyToken);
router.use(validatePermission("/roles"));

router.get("/", getRoles);
router.get("/permissions", getPermissions);
router.post("/create", validateSchema(createRol), create);

export default router;
