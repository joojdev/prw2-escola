import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET: string = (() => {
  const val = process.env["JWT_SECRET"];
  if (!val) throw new Error("JWT_SECRET não está definido no .env");
  return val;
})();

export const PORT: string = process.env["PORT"] ?? "3000";
