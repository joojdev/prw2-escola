import fs from "fs";
import path from "path";
import { AlunoRepository } from "../repositories/AlunoRepository";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import type { Aluno } from "../models/Aluno";
import type { Usuario } from "../models/Usuario";

export function seed(): void {
  const alunosPath = path.join(process.cwd(), "alunos.json");
  if (fs.existsSync(alunosPath)) {
    const data = JSON.parse(fs.readFileSync(alunosPath, "utf-8")) as Aluno[];
    for (const aluno of data) {
      AlunoRepository.create(aluno);
    }
    console.log(`Seed: ${data.length} aluno(s) carregado(s) de alunos.json`);
  }

  const usuariosPath = path.join(process.cwd(), "usuarios.json");
  if (fs.existsSync(usuariosPath)) {
    const data = JSON.parse(fs.readFileSync(usuariosPath, "utf-8")) as Usuario[];
    for (const usuario of data) {
      UsuarioRepository.create(usuario);
    }
    console.log(`Seed: ${data.length} usuário(s) carregado(s) de usuarios.json`);
  }
}
