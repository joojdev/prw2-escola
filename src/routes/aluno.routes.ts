import { Router } from "express";
import { AlunoController } from "../controllers/AlunoController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { createAlunoSchema, updateAlunoSchema } from "../schemas/aluno.schema";

const router = Router();

router.use(authMiddleware);

// Rotas específicas ANTES de /:id para evitar conflito
router.get("/medias", AlunoController.getMedias);
router.get("/aprovados", AlunoController.getAprovados);
router.get("/", AlunoController.getAll);
router.get("/:id", AlunoController.getById);
router.post("/", validate(createAlunoSchema), AlunoController.create);
router.put("/:id", validate(updateAlunoSchema), AlunoController.update);
router.delete("/:id", AlunoController.delete);

export default router;
