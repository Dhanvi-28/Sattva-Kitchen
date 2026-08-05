import { z } from "zod";

export const recommendationSchema = z.object({
  body: z.object({
    answers: z.record(z.any()),
    dietaryPreferences: z.array(z.string()).optional(),
    dosha: z.string().optional(),
    tcmConstitution: z.string().optional(),
  }),
});
