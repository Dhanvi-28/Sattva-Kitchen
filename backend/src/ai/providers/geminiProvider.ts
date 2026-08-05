import { IAIProvider, IAIRecommendationInput } from "../interfaces/aiProvider.interface.js";
import { IRecipe } from "../../interfaces/recipe.interface.js";
import { logger } from "../../utils/logger.js";

export class GeminiProvider implements IAIProvider {
  public name = "Gemini";
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  public async generateRecipe(prompt: string): Promise<Partial<IRecipe>> {
    logger.info(`[GeminiProvider] Generating recipe for prompt: ${prompt}`);
    return {
      title: "Spiced Roasted Sweet Potato & Miso Lotus Bowl",
      slug: "spiced-roasted-sweet-potato-miso-lotus-bowl",
      description: "A grounding autumn Buddha bowl combining roasted roots, toasted seeds, and digestive ginger.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      prepTime: 20,
      cookTime: 30,
      servings: 2,
      difficulty: "Easy",
      calories: 410,
      protein: 11,
      fat: 14,
      carbohydrates: 62,
      fiber: 12,
      dietaryTags: ["Grounding", "Kapha Reducing", "Vegan", "High Fiber"],
      allergens: ["Soy"],
      ingredients: [
        { name: "Sweet Potato", quantity: "2 medium" },
        { name: "Lotus Root Slices", quantity: "1 cup" },
        { name: "White Miso Paste", quantity: "1 tbsp" },
        { name: "Toasted Sesame Seeds", quantity: "1 tbsp" }
      ],
      instructions: [
        { stepNumber: 1, instruction: "Toss cubed sweet potato and lotus root in sesame oil and roast at 200°C for 25 mins." },
        { stepNumber: 2, instruction: "Whisk miso paste with warm water, ginger juice, and lemon as a dressing." }
      ],
      mealType: "Lunch",
      season: "Autumn",
      ayurvedaBenefits: {
        doshaImpact: "Vata Balancing",
        summary: "Grounding root vegetables soothe anxious energy and stabilize blood sugar."
      },
      tcmBenefits: {
        thermalNature: "Neutral",
        summary: "Strengthens Stomach and Spleen, regulates Qi."
      }
    };
  }

  public async recommendRecipes(input: IAIRecommendationInput, candidateRecipes: IRecipe[]): Promise<IRecipe[]> {
    logger.info(`[GeminiProvider] Recommending recipes based on answers:`, input.answers);
    return candidateRecipes.slice(0, 6);
  }

  public async analyzeNutrition(ingredients: string[]): Promise<Record<string, any>> {
    return {
      ingredientCount: ingredients.length,
      estimatedCalories: ingredients.length * 90,
      ayurvedicQualities: "Grounding and Sattvic"
    };
  }
}
