import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
});

export const updateAuthorSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional()
});
