import type { Request, Response, NextFunction } from "express";
import { AlunoService } from "../services/AlunoService";

export const AlunoController = {
  getAll(req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(200).json(AlunoService.getAll());
    } catch (err) {
      next(err);
    }
  },

  getMedias(req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(200).json(AlunoService.getMedias());
    } catch (err) {
      next(err);
    }
  },

  getAprovados(req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(200).json(AlunoService.getAprovados());
    } catch (err) {
      next(err);
    }
  },

  getById(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id: idParam } = req.params as { id: string };
      const id = parseInt(idParam, 10);
      if (isNaN(id)) {
        res.status(404).json({ message: "Aluno não encontrado!" });
        return;
      }
      res.status(200).json(AlunoService.getById(id));
    } catch (err) {
      next(err);
    }
  },

  create(req: Request, res: Response, next: NextFunction): void {
    try {
      AlunoService.create(req.body);
      res.status(201).json({ message: "Aluno criado com sucesso!" });
    } catch (err) {
      next(err);
    }
  },

  update(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id: idParam } = req.params as { id: string };
      const id = parseInt(idParam, 10);
      if (isNaN(id)) {
        res.status(404).json({ message: "Aluno não encontrado!" });
        return;
      }
      const updated = AlunoService.update(id, req.body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  },

  delete(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id: idParam } = req.params as { id: string };
      const id = parseInt(idParam, 10);
      if (isNaN(id)) {
        res.status(404).json({ message: "Aluno não encontrado!" });
        return;
      }
      AlunoService.delete(id);
      res.status(200).json({ message: "Aluno removido!" });
    } catch (err) {
      next(err);
    }
  },
};
