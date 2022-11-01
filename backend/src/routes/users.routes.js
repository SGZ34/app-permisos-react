import { Router } from "express";
import { create, get } from "../controllers/users.controller.js";
import { validatePermission } from "../middlewares/validatePermission.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createUser } from "../schemas/user.js";

const router = Router();

router.use(verifyToken);
router.use(validatePermission("/users"));

router.get("/", get);
router.post("/create", validateSchema(createUser), create);

export default router;
