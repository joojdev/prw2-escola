import type { Usuario } from "../models/Usuario";

const usuarios: Usuario[] = [];

export const UsuarioRepository = {
  findByUsername(username: string): Usuario | undefined {
    return usuarios.find(u => u.username === username);
  },

  existsByUsername(username: string): boolean {
    return usuarios.some(u => u.username === username);
  },

  create(usuario: Usuario): void {
    usuarios.push(usuario);
  },
};
