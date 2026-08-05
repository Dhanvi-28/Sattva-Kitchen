export class PromptBuilder {
  public static buildRecipeGenerationPrompt(topic: string, dosha?: string, tcmNature?: string): string {
    return `You are a Master Ayurvedic & Traditional Chinese Medicine (TCM) Culinary Wellness Expert.
Generate a structured JSON recipe for: "${topic}".
Target Dosha Alignment: ${dosha || "Tridoshic (Vata, Pitta, Kapha)"}.
Target TCM Thermal Nature: ${tcmNature || "Neutral/Warming"}.

Respond ONLY with valid JSON matching this structure:
{
  "title": "Recipe Title",
  "description": "Engaging description explaining Ayurvedic and TCM benefits.",
  "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "prepTime": 15,
  "cookTime": 25,
  "servings": 2,
  "difficulty": "Easy",
  "calories": 350,
  "protein": 12,
  "fat": 10,
  "carbohydrates": 45,
  "fiber": 8,
  "dietaryTags": ["Vegan", "Gluten-Free", "Vata Balancing"],
  "allergens": [],
  "ingredients": [{"name": "Yellow Moong Dal", "quantity": "1/2 cup"}],
  "instructions": [{"stepNumber": 1, "instruction": "Rinse dal thoroughly and soak for 20 minutes."}],
  "mealType": "Dinner",
  "season": "All Seasons",
  "ayurvedaBenefits": {
    "doshaImpact": "Vata Balancing",
    "summary": "Nourishes nervous system and stabilizes digestion."
  },
  "tcmBenefits": {
    "thermalNature": "Warming",
    "summary": "Tonifies Spleen Qi and harmonizes stomach."
  }
}`;
  }

  public static buildRecommendationPrompt(userPreferences: Record<string, any>): string {
    return `Analyze user wellness preferences: ${JSON.stringify(userPreferences)}.
Select and rank recipes that best optimize their Ayurvedic digestion (Agni) and TCM energy flow (Qi).`;
  }
}
