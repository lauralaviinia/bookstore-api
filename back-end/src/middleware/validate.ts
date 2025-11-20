import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";


export const validateBody =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: result.error.issues, 
      });
    }

    req.body = result.data;
    next();
  };

