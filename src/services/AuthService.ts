import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { AppError } from "../utils/AppError";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import type { AuthInput } from "../schemas/auth.schema";

export const AuthService = {
  async register({ username, password }: AuthInput): Promise<void> {
    if (UsuarioRepository.existsByUsername(username)) {
      throw new AppError(400, "Usuário já existe!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    UsuarioRepository.create({ username, password: hashedPassword });
  },

  async login({ username, password }: AuthInput): Promise<{ username: string; token: string }> {
    const usuario = UsuarioRepository.findByUsername(username);
    if (!usuario) throw new AppError(401, "Login Incorreto!");

    const isValid = await bcrypt.compare(password, usuario.password);
    if (!isValid) throw new AppError(401, "Login Incorreto!");

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return { username, token };
  },
};
