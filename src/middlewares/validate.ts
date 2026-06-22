import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues.map((e: { message: string }) => e.message).join(", ");
      res.status(400).json({ message });
      return;
    }
    req.body = result.data;
    next();
  };
}
