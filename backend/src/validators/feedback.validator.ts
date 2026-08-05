import { z } from "zod";

export const feedbackSchema = z.object({
  body: z.object({
    recipeId: z.string().optional(),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
    userEmail: z.string().email().optional(),
  }),
});
