import { IAIProvider, IAIRecommendationInput } from "../interfaces/aiProvider.interface.js";
import { IRecipe } from "../../interfaces/recipe.interface.js";
import { logger } from "../../utils/logger.js";

export class DeepSeekProvider implements IAIProvider {
  public name = "DeepSeek";
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  public async generateRecipe(prompt: string): Promise<Partial<IRecipe>> {
    logger.info(`[DeepSeekProvider] Generating recipe for prompt: ${prompt}`);
    return {
      title: "Warm Ginger & Black Sesame Porridge",
      slug: "warm-ginger-black-sesame-porridge",
      description: "A comforting breakfast congee that invigorates metabolic heat and nourishes kidneys.",
      image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80",
      prepTime: 10,
      cookTime: 35,
      servings: 2,
      difficulty: "Easy",
      calories: 290,
      protein: 8,
      fat: 9,
      carbohydrates: 46,
      fiber: 7,
      dietaryTags: ["Yang Warming", "Vata Balancing", "Dairy-Free"],
      allergens: ["Sesame"],
      ingredients: [
        { name: "Black Sesame Seeds", quantity: "3 tbsp" },
        { name: "Rolled Oats or Rice", quantity: "1 cup" },
        { name: "Fresh Ginger", quantity: "1 tbsp minced" }
      ],
      instructions: [
        { stepNumber: 1, instruction: "Toast black sesame seeds lightly until fragrant." },
        { stepNumber: 2, instruction: "Simmer oats with minced ginger and water for 30 minutes until silky." }
      ],
      mealType: "Breakfast",
      season: "Winter",
      ayurvedaBenefits: {
        doshaImpact: "Vata Balancing",
        summary: "Warm, heavy, and oily qualities calm cold Vata energy."
      },
      tcmBenefits: {
        thermalNature: "Warming",
        summary: "Tonifies Kidney Jing and warms Essence."
      }
    };
  }

  public async recommendRecipes(input: IAIRecommendationInput, candidateRecipes: IRecipe[]): Promise<IRecipe[]> {
    logger.info(`[DeepSeekProvider] Recommending recipes based on answers:`, input.answers);
    return candidateRecipes.slice(0, 6);
  }

  public async analyzeNutrition(ingredients: string[]): Promise<Record<string, any>> {
    return {
      ingredientCount: ingredients.length,
      estimatedCalories: ingredients.length * 75,
      tcmProperties: "Warms Kidneys & Essence"
    };
  }
}
