import { AppError } from "../utils/AppError";
import { AlunoRepository } from "../repositories/AlunoRepository";
import type { CreateAlunoInput, UpdateAlunoInput } from "../schemas/aluno.schema";

export const AlunoService = {
  getAll() {
    return AlunoRepository.findAll();
  },

  getMedias() {
    return AlunoRepository.findAll().map(a => ({
      nome: a.nome,
      media: (a.nota1 + a.nota2) / 2,
    }));
  },

  getAprovados() {
    return AlunoRepository.findAll().map(a => {
      const media = (a.nota1 + a.nota2) / 2;
      const status: "aprovado" | "reprovado" = media >= 6 ? "aprovado" : "reprovado";
      return { nome: a.nome, status };
    });
  },

  getById(id: number) {
    const aluno = AlunoRepository.findById(id);
    if (!aluno) throw new AppError(404, "Aluno não encontrado!");
    return aluno;
  },

  create(data: CreateAlunoInput) {
    if (AlunoRepository.existsById(data.id)) {
      throw new AppError(400, "Já existe um aluno com esse id!");
    }
    AlunoRepository.create(data);
  },

  update(id: number, data: UpdateAlunoInput) {
    if (!AlunoRepository.existsById(id)) {
      throw new AppError(404, "Aluno não encontrado!");
    }
    return AlunoRepository.update(id, data);
  },

  delete(id: number) {
    if (!AlunoRepository.existsById(id)) {
      throw new AppError(404, "Aluno não encontrado!");
    }
    AlunoRepository.delete(id);
  },
};
