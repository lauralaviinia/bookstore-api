import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1),
  published: z.string()
    .refine((s: string) => !Number.isNaN(Date.parse(s)), { message: "Invalid date" })
    .transform((s: string) => new Date(s)),
  authorId: z.number().int().positive(),
  categoryId: z.number().int().positive()
});

export const updateBookSchema = z.object({
  title: z.string().min(1).optional(),
  published: z.string()
    .optional()
    .refine((s: string | undefined) => s === undefined || !Number.isNaN(Date.parse(s)), { message: "Invalid date" })
    .transform((s: string | undefined) => s ? new Date(s) : undefined),
  authorId: z.number().int().positive().optional(),
  categoryId: z.number().int().positive().optional()
});
