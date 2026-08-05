import { IRecipe } from "../../interfaces/recipe.interface.js";

export interface IAIRecommendationInput {
  answers: Record<string, any>;
  dietaryTags?: string[];
  wellnessGoal?: string;
  dosha?: string;
  tcmThermal?: string;
}

export interface IAIProvider {
  name: string;
  generateRecipe(prompt: string): Promise<Partial<IRecipe>>;
  recommendRecipes(input: IAIRecommendationInput, candidateRecipes: IRecipe[]): Promise<IRecipe[]>;
  analyzeNutrition(ingredients: string[]): Promise<Record<string, any>>;
}
