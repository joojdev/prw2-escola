import type { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as Request & { user: unknown }).user = decoded;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({ message: "Acesso negado. Token expirado." });
    } else if (err instanceof JsonWebTokenError) {
      res.status(403).json({ message: "Acesso negado. Token inválido." });
    } else {
      res.status(403).json({ message: "Acesso negado. Erro na verificação do token." });
    }
  }
}
