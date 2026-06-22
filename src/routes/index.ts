import { Router } from "express";
import authRoutes from "./auth.routes";
import alunoRoutes from "./aluno.routes";

const router = Router();

router.use(authRoutes);
router.use("/alunos", alunoRoutes);

export default router;
