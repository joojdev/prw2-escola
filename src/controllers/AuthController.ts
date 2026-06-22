import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await AuthService.register(req.body);
      res.status(201).json({ message: "Usuário criado!" });
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, token } = await AuthService.login(req.body);
      res.status(200).json({ message: `Login efetuado pelo usuário ${username}`, jwt: token });
    } catch (err) {
      next(err);
    }
  },
};
