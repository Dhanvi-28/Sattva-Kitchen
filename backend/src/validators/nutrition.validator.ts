import { z } from "zod";

export const analyzeNutritionSchema = z.object({
  body: z.object({
    ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
  }),
});
