import { z } from "zod";

export const createAlunoSchema = z.object({
  id: z.number({ error: "id é obrigatório e deve ser número" }),
  nome: z.string().min(1, "nome é obrigatório"),
  ra: z.string().min(1, "ra é obrigatório"),
  nota1: z.number({ error: "nota1 é obrigatória e deve ser número" }),
  nota2: z.number({ error: "nota2 é obrigatória e deve ser número" }),
});

export const updateAlunoSchema = z.object({
  nome: z.string().min(1, "nome é obrigatório"),
  ra: z.string().min(1, "ra é obrigatório"),
  nota1: z.number({ error: "nota1 é obrigatória e deve ser número" }),
  nota2: z.number({ error: "nota2 é obrigatória e deve ser número" }),
});

export type CreateAlunoInput = z.infer<typeof createAlunoSchema>;
export type UpdateAlunoInput = z.infer<typeof updateAlunoSchema>;
