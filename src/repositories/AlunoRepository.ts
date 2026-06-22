import type { Aluno } from "../models/Aluno";
import type { CreateAlunoInput, UpdateAlunoInput } from "../schemas/aluno.schema";

const alunos: Aluno[] = [];

export const AlunoRepository = {
  findAll(): Aluno[] {
    return alunos;
  },

  findById(id: number): Aluno | undefined {
    return alunos.find(a => a.id === id);
  },

  existsById(id: number): boolean {
    return alunos.some(a => a.id === id);
  },

  create(data: CreateAlunoInput): void {
    alunos.push(data);
  },

  update(id: number, data: UpdateAlunoInput): Aluno {
    const index = alunos.findIndex(a => a.id === id);
    const updated: Aluno = { id, ...data };
    alunos.splice(index, 1, updated);
    return updated;
  },

  delete(id: number): void {
    const index = alunos.findIndex(a => a.id === id);
    alunos.splice(index, 1);
  },
};
