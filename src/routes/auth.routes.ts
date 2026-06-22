import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validate } from "../middlewares/validate";
import { authSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/register", validate(authSchema), AuthController.register);
router.post("/login", validate(authSchema), AuthController.login);

export default router;
