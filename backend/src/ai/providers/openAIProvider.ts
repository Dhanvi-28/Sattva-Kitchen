import { IAIProvider, IAIRecommendationInput } from "../interfaces/aiProvider.interface.js";
import { IRecipe } from "../../interfaces/recipe.interface.js";
import { logger } from "../../utils/logger.js";

export class OpenAIProvider implements IAIProvider {
  public name = "OpenAI";
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  public async generateRecipe(prompt: string): Promise<Partial<IRecipe>> {
    logger.info(`[OpenAIProvider] Generating recipe for prompt: ${prompt}`);
    // If real API key was available we would call OpenAI API here.
    // Clean heuristic fallback object:
    return {
      title: "Ayurvedic Golden Turmeric & Ginger Kitchari",
      slug: "ayurvedic-golden-turmeric-ginger-kitchari",
      description: "A nourishing one-pot cleansing meal infused with cumin, coriander, and ghee to soothe digestion.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      prepTime: 15,
      cookTime: 25,
      servings: 2,
      difficulty: "Easy",
      calories: 340,
      protein: 14,
      fat: 8,
      carbohydrates: 52,
      fiber: 9,
      dietaryTags: ["Vata Balancing", "Gluten-Free", "Ayurvedic", "Easy Digest"],
      allergens: [],
      ingredients: [
        { name: "Yellow Split Moong Dal", quantity: "1/2 cup" },
        { name: "Basmati Rice", quantity: "1/2 cup" },
        { name: "Fresh Ground Turmeric", quantity: "1 tsp" },
        { name: "Ghee or Sesame Oil", quantity: "1 tbsp" }
      ],
      instructions: [
        { stepNumber: 1, instruction: "Rinse moong dal and basmati rice until water runs clear." },
        { stepNumber: 2, instruction: "Heat ghee in a heavy pot, add cumin seeds and turmeric." },
        { stepNumber: 3, instruction: "Add rice, dal, 4 cups water, and simmer for 25 minutes." }
      ],
      mealType: "Dinner",
      season: "All Seasons",
      ayurvedaBenefits: {
        doshaImpact: "Vata Balancing",
        summary: "Soothes internal wind and re-establishes metabolic digestive fire (Agni)."
      },
      tcmBenefits: {
        thermalNature: "Warming",
        summary: "Tonifies Spleen Qi and dispels dampness."
      }
    };
  }

  public async recommendRecipes(input: IAIRecommendationInput, candidateRecipes: IRecipe[]): Promise<IRecipe[]> {
    logger.info(`[OpenAIProvider] Recommending recipes based on answers:`, input.answers);
    const answersStr = JSON.stringify(input.answers).toLowerCase();
    
    return candidateRecipes.filter((r) => {
      if (answersStr.includes("vegan") && !r.dietaryTags.includes("Vegan")) return false;
      if (answersStr.includes("vata") && r.ayurvedaBenefits?.doshaImpact !== "Vata Balancing") return false;
      return true;
    }).slice(0, 6);
  }

  public async analyzeNutrition(ingredients: string[]): Promise<Record<string, any>> {
    return {
      ingredientCount: ingredients.length,
      estimatedCalories: ingredients.length * 85,
      macronutrients: { protein: 12, fat: 9, carbs: 45, fiber: 7 },
      ayurvedicQualities: "Balanced Rasa (Taste) with Heating Agni properties",
      tcmProperties: "Nourishes Blood & Qi"
    };
  }
}
