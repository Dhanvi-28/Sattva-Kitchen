import { z } from "zod";

export const getRecipeByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Recipe ID or slug is required"),
  }),
});

export const generateRecipeSchema = z.object({
  body: z.object({
    topic: z.string().min(2, "Topic must be at least 2 characters"),
    dosha: z.enum(["Vata", "Pitta", "Kapha", "Tridoshic"]).optional(),
    tcmNature: z.enum(["Warming", "Cooling", "Neutral"]).optional(),
  }),
});

export const searchRecipeSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    category: z.string().optional(),
    mealType: z.string().optional(),
    diet: z.string().optional(),
    dosha: z.string().optional(),
    tcm: z.string().optional(),
    difficulty: z.string().optional(),
    maxTime: z.string().optional(),
    maxCalories: z.string().optional(),
    minProtein: z.string().optional(),
    sort: z.enum(["popular", "recent", "time", "calories"]).optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});
