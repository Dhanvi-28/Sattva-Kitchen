import { LLMFactory } from "./llmFactory.js";
import { PromptBuilder } from "./promptBuilder.js";
import { IRecipe } from "../interfaces/recipe.interface.js";
import { Recipe } from "../models/recipe.model.ts";
import { AILog } from "../models/aiLog.model.ts";
import { logger } from "../utils/logger.js";

export class RecipeGenerationService {
  public static async generateRecipe(topic: string, dosha?: string, tcmNature?: string): Promise<Partial<IRecipe>> {
    const startTime = Date.now();
    const provider = LLMFactory.getProvider();
    const prompt = PromptBuilder.buildRecipeGenerationPrompt(topic, dosha, tcmNature);

    try {
      const generated = await provider.generateRecipe(prompt);
      const latencyMs = Date.now() - startTime;

      // Log AI execution to MongoDB audit trail
      try {
        await AILog.create({
          provider: provider.name,
          action: "generateRecipe",
          prompt,
          response: JSON.stringify(generated),
          latencyMs,
        });
      } catch (logErr) {
        logger.warn("Could not record AI Log to DB:", logErr);
      }

      return generated;
    } catch (err: any) {
      logger.error("Error in RecipeGenerationService:", err);
      throw err;
    }
  }
}
