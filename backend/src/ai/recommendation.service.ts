import { LLMFactory } from "./llmFactory.js";
import { Recipe } from "../models/recipe.model.ts";
import { IRecipe } from "../interfaces/recipe.interface.js";
import { logger } from "../utils/logger.js";

export class RecommendationService {
  public static async getRecommendations(answers: Record<string, any>): Promise<IRecipe[]> {
    const candidateRecipes = await Recipe.find({}).lean();
    if (!candidateRecipes || candidateRecipes.length === 0) {
      return [];
    }

    const provider = LLMFactory.getProvider();
    try {
      const recommendations = await provider.recommendRecipes({ answers }, candidateRecipes as any);
      if (recommendations && recommendations.length > 0) {
        return recommendations;
      }
    } catch (err) {
      logger.warn("AI recommendation error, falling back to database query matching:", err);
    }

    // Database fallback ranking: match diet & tags
    const answersArr = Object.values(answers).flat().map((v) => String(v).toLowerCase());
    
    return (candidateRecipes as unknown as IRecipe[]).sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      a.dietaryTags?.forEach((tag) => {
        if (answersArr.includes(tag.toLowerCase())) scoreA += 2;
      });
      b.dietaryTags?.forEach((tag) => {
        if (answersArr.includes(tag.toLowerCase())) scoreB += 2;
      });

      return scoreB - scoreA;
    }).slice(0, 6);
  }
}
