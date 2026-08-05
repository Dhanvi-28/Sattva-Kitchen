export interface IIngredient {
  name: string;
  quantity?: string;
  unit?: string;
  notes?: string;
}

export interface IInstructionStep {
  stepNumber: number;
  instruction: string;
  tip?: string;
}

export interface IAyurvedaBenefits {
  doshaImpact: "Vata Balancing" | "Pitta Cooling" | "Kapha Reducing" | "Tridoshic";
  gunas?: string[]; // e.g. Light, Warm, Oily
  rasa?: string[];  // e.g. Sweet, Pungent, Bitter
  summary: string;
}

export interface ITCMBenefits {
  thermalNature: "Warming" | "Cooling" | "Neutral" | "Hot" | "Cold";
  targetOrgans?: string[]; // e.g. Spleen, Stomach, Liver
  elementEffect?: string;  // e.g. Nourishes Qi, Clears Heat
  summary: string;
}

export interface IRecipe {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  ingredients: IIngredient[];
  instructions: IInstructionStep[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  calories: number;
  protein: number; // in grams
  fat: number; // in grams
  carbohydrates: number; // in grams
  fiber: number; // in grams
  vitamins?: string[];
  minerals?: string[];
  dietaryTags: string[];
  allergens: string[];
  bestTimeToEat?: string;
  storageInstructions?: string;
  cookingTips?: string[];
  traditionalBenefits?: string;
  modernNutritionBenefits?: string;
  ayurvedaBenefits?: IAyurvedaBenefits;
  tcmBenefits?: ITCMBenefits;
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Elixir" | "Soup";
  season: "Spring" | "Summer" | "Autumn" | "Winter" | "All Seasons";
  isPopular?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
