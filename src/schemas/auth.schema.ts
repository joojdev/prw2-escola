import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(1, "username é obrigatório"),
  password: z.string().min(1, "password é obrigatório"),
});

export type AuthInput = z.infer<typeof authSchema>;
