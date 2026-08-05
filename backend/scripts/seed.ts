import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../src/config/db.js";
import { Recipe } from "../src/models/recipe.model.js";
import { Category } from "../src/models/category.model.js";
import { Tag } from "../src/models/tag.model.js";
import { WellnessCondition } from "../src/models/wellnessCondition.model.js";
import { PromptTemplate } from "../src/models/promptTemplate.model.js";
import { logger } from "../src/utils/logger.js";

const categoriesData = [
  {
    name: "Soups & Stews",
    slug: "soups-stews",
    description: "Nourishing, easily digestible warm bowls that ignite your metabolic fire.",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    recipeCount: 4,
  },
  {
    name: "Nourishing Bowls",
    slug: "nourishing-bowls",
    description: "Harmonious combinations of grounding grains, seasonal roots, and digestive spices.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    recipeCount: 4,
  },
  {
    name: "Herbal Elixirs",
    slug: "herbal-elixirs",
    description: "Vitalizing tonics crafted with adaptogenic herbs, flowers, and medicinal mushrooms.",
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    recipeCount: 3,
  },
  {
    name: "Cleansing Kitchari",
    slug: "cleansing-kitchari",
    description: "Traditional Ayurvedic one-pot detox meals balancing all three doshas.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    recipeCount: 3,
  },
];

const tagsData = [
  { name: "Vata Balancing", slug: "vata-balancing", category: "Ayurveda" },
  { name: "Pitta Cooling", slug: "pitta-cooling", category: "Ayurveda" },
  { name: "Kapha Reducing", slug: "kapha-reducing", category: "Ayurveda" },
  { name: "Tridoshic", slug: "tridoshic", category: "Ayurveda" },
  { name: "Qi Tonic", slug: "qi-tonic", category: "TCM" },
  { name: "Yin Nourishing", slug: "yin-nourishing", category: "TCM" },
  { name: "Yang Warming", slug: "yang-warming", category: "TCM" },
  { name: "Vegan", slug: "vegan", category: "Diet" },
  { name: "Gluten-Free", slug: "gluten-free", category: "Diet" },
  { name: "Dairy-Free", slug: "dairy-free", category: "Diet" },
];

const wellnessConditionsData = [
  {
    id: "vata-imbalance",
    name: "Vata Balancing (Calm & Ground)",
    category: "Dosha",
    description: "Relieves dry skin, restlessness, cold hands, and irregular digestion.",
    recommendedTags: ["Vata Balancing", "Gluten-Free", "Warm"],
  },
  {
    id: "pitta-imbalance",
    name: "Pitta Cooling (Ease Inflammation)",
    category: "Dosha",
    description: "Soothes acidity, skin redness, irritability, and excessive heat.",
    recommendedTags: ["Pitta Cooling", "Yin Nourishing"],
  },
  {
    id: "kapha-imbalance",
    name: "Kapha Reducing (Lighten & Invigorate)",
    category: "Dosha",
    description: "Reduces lethargy, sinus congestion, and slow digestion.",
    recommendedTags: ["Kapha Reducing", "Yang Warming"],
  },
  {
    id: "digestive-reset",
    name: "Digestive Reset (Agni Fire)",
    category: "Goal",
    description: "Restores optimal gut microbiome and removes metabolic waste (Ama).",
    recommendedTags: ["Tridoshic", "Vegan"],
  },
];

const recipesData = [
  {
    title: "Golden Turmeric & Ginger Moong Dal Kitchari",
    slug: "golden-turmeric-moong-dal-kitchari",
    description: "A soothing Ayurvedic staple made with split yellow moong, cumin, coriander, and ghee to reboot digestion and calm Vata.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Yellow Split Moong Dal", quantity: "1/2 cup", unit: "cup" },
      { name: "Basmati Rice", quantity: "1/2 cup", unit: "cup" },
      { name: "Ghee or Sesame Oil", quantity: "1 tbsp", unit: "tbsp" },
      { name: "Fresh Turmeric", quantity: "1 tsp", unit: "tsp" },
      { name: "Whole Cumin & Coriander Seeds", quantity: "1 tsp", unit: "tsp" }
    ],
    instructions: [
      { stepNumber: 1, instruction: "Rinse moong dal and rice in warm water until clear." },
      { stepNumber: 2, instruction: "Heat ghee in a heavy pot, pop cumin seeds until aromatic, then stir in turmeric and ginger." },
      { stepNumber: 3, instruction: "Add dal, rice, and 4 cups filtered water. Bring to boil, lower heat, cover and cook 25 minutes." }
    ],
    prepTime: 15,
    cookTime: 25,
    servings: 3,
    difficulty: "Easy",
    calories: 320,
    protein: 13,
    fat: 7,
    carbohydrates: 54,
    fiber: 8,
    dietaryTags: ["Vata Balancing", "Tridoshic", "Gluten-Free", "Ayurvedic"],
    allergens: [],
    bestTimeToEat: "Dinner or lunch during seasonal transitions",
    storageInstructions: "Refrigerate up to 3 days in airtight container.",
    cookingTips: ["Add fresh cilantro and a squeeze of lime before serving to boost Prana."],
    traditionalBenefits: "Known in classical Ayurveda as the supreme healing meal for restoring digestive Agni.",
    modernNutritionBenefits: "Provides a complete protein profile with easily fermentable dietary fibers.",
    ayurvedaBenefits: {
      doshaImpact: "Tridoshic",
      summary: "Balances all three doshas while soothing gut inflammation."
    },
    tcmBenefits: {
      thermalNature: "Neutral",
      summary: "Tonifies Spleen Qi and harmonizes Middle Jiao."
    },
    mealType: "Dinner",
    season: "All Seasons",
    isPopular: true
  },
  {
    title: "Tremella & Goji Berry Yin Hydration Tonic",
    slug: "tremella-goji-berry-yin-hydration-tonic",
    description: "Traditional Chinese Medicine beauty elixir infused with snow mushroom, red dates, and goji berries to nourish skin and Kidney Yin.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Dried Tremella (Snow) Mushroom", quantity: "15g", unit: "g" },
      { name: "Goji Berries", quantity: "2 tbsp", unit: "tbsp" },
      { name: "Red Dates (Jujube)", quantity: "6 pieces", unit: "pc" }
    ],
    instructions: [
      { stepNumber: 1, instruction: "Soak snow mushroom in warm water until soft and gelatinous, trim stem." },
      { stepNumber: 2, instruction: "Add mushroom and dates with 5 cups water to a pot; simmer gently for 40 minutes." },
      { stepNumber: 3, instruction: "Stir in goji berries during the last 5 minutes of cooking." }
    ],
    prepTime: 10,
    cookTime: 40,
    servings: 2,
    difficulty: "Medium",
    calories: 160,
    protein: 4,
    fat: 1,
    carbohydrates: 36,
    fiber: 7,
    dietaryTags: ["Yin Nourishing", "Pitta Cooling", "Vegan", "Gluten-Free"],
    allergens: [],
    bestTimeToEat: "Evening or after dry weather exposure",
    storageInstructions: "Best consumed fresh warm or chilled.",
    cookingTips: ["Cook until the broth becomes silky and gelatinous for maximum benefit."],
    traditionalBenefits: "Valued in ancient Chinese imperial courts for moisture retention and radiant complexion.",
    modernNutritionBenefits: "Rich in beta-glucans and plant polysaccharides supporting skin barrier elasticity.",
    ayurvedaBenefits: {
      doshaImpact: "Pitta Cooling",
      summary: "Cools internal systemic heat and replenishes bodily fluids (Rasa Dhatu)."
    },
    tcmBenefits: {
      thermalNature: "Cooling",
      summary: "Generates fluids, moistens Lungs, and replenishes Kidney Essence (Jing)."
    },
    mealType: "Elixir",
    season: "Autumn",
    isPopular: true
  },
  {
    title: "Grounding Spiced Roasted Root Buddha Bowl",
    slug: "grounding-spiced-roasted-root-buddha-bowl",
    description: "Warm roasted sweet potato, lotus root, and toasted sesame seeds drizzled with ginger-miso reduction.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Sweet Potato", quantity: "2 medium", unit: "pcs" },
      { name: "Lotus Root Slices", quantity: "1 cup", unit: "cup" },
      { name: "White Miso Paste", quantity: "1 tbsp", unit: "tbsp" },
      { name: "Toasted Sesame Oil", quantity: "1 tbsp", unit: "tbsp" }
    ],
    instructions: [
      { stepNumber: 1, instruction: "Preheat oven to 200°C. Toss sweet potatoes and lotus root in sesame oil and roast 25 minutes." },
      { stepNumber: 2, instruction: "Whisk miso paste with warm water and lemon juice." },
      { stepNumber: 3, instruction: "Assemble roasted roots in warm bowls and drizzle dressing." }
    ],
    prepTime: 20,
    cookTime: 25,
    servings: 2,
    difficulty: "Easy",
    calories: 390,
    protein: 10,
    fat: 12,
    carbohydrates: 64,
    fiber: 11,
    dietaryTags: ["Vata Balancing", "Qi Tonic", "Vegan", "High Fiber"],
    allergens: ["Soy", "Sesame"],
    bestTimeToEat: "Midday lunch",
    storageInstructions: "Keep roasted vegetables separate from dressing up to 4 days.",
    cookingTips: ["Roast until sweet potato edges are caramelized."],
    traditionalBenefits: "Grounds uncentered mental activity by anchoring physical energy in the lower abdomen.",
    modernNutritionBenefits: "Loaded with complex carbohydrates, vitamin A, and prebiotic resistant starch.",
    ayurvedaBenefits: {
      doshaImpact: "Vata Balancing",
      summary: "Heavy and sweet root energy stabilizes erratic Vata dosha."
    },
    tcmBenefits: {
      thermalNature: "Neutral",
      summary: "Strengthens Stomach and Spleen, regulates Qi."
    },
    mealType: "Lunch",
    season: "Autumn",
    isPopular: true
  },
  {
    title: "Invigorating Black Sesame & Ginger Congee",
    slug: "invigorating-black-sesame-ginger-congee",
    description: "A nourishing breakfast porridge packed with mineral-dense black sesame seeds and digestive ginger.",
    image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Black Sesame Seeds", quantity: "3 tbsp", unit: "tbsp" },
      { name: "Short Grain Brown Rice", quantity: "1 cup", unit: "cup" },
      { name: "Fresh Ginger Slices", quantity: "1 tbsp", unit: "tbsp" }
    ],
    instructions: [
      { stepNumber: 1, instruction: "Lightly toast black sesame seeds and grind coarsely." },
      { stepNumber: 2, instruction: "Simmer rice with ginger and 6 cups water for 45 minutes until creamy." },
      { stepNumber: 3, instruction: "Stir in toasted black sesame meal and serve warm." }
    ],
    prepTime: 10,
    cookTime: 45,
    servings: 4,
    difficulty: "Easy",
    calories: 280,
    protein: 7,
    fat: 8,
    carbohydrates: 46,
    fiber: 6,
    dietaryTags: ["Yang Warming", "Vata Balancing", "Dairy-Free"],
    allergens: ["Sesame"],
    bestTimeToEat: "Warm breakfast",
    storageInstructions: "Reheat with additional warm water or broth.",
    cookingTips: ["Grind sesame seeds right before adding to preserve vital oils."],
    traditionalBenefits: "Traditional tonic for hair, bone marrow, and Kidney Jing in Eastern herbalism.",
    modernNutritionBenefits: "Provides rich plant calcium, iron, and magnesium.",
    ayurvedaBenefits: {
      doshaImpact: "Vata Balancing",
      summary: "Warm, unctuous porridge calms internal dryness."
    },
    tcmBenefits: {
      thermalNature: "Warming",
      summary: "Tonifies Kidney Jing and promotes blood circulation."
    },
    mealType: "Breakfast",
    season: "Winter",
    isPopular: false
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    logger.info("Cleaning existing database collections...");
    await Promise.all([
      Recipe.deleteMany({}),
      Category.deleteMany({}),
      Tag.deleteMany({}),
      WellnessCondition.deleteMany({}),
      PromptTemplate.deleteMany({})
    ]);

    logger.info("Seeding Categories...");
    await Category.insertMany(categoriesData);

    logger.info("Seeding Tags...");
    await Tag.insertMany(tagsData);

    logger.info("Seeding Wellness Conditions...");
    await WellnessCondition.insertMany(wellnessConditionsData);

    logger.info("Seeding Recipes...");
    await Recipe.insertMany(recipesData);

    logger.info("Seeding Prompt Templates...");
    await PromptTemplate.create({
      name: "default_recipe_gen",
      template: "Generate an authentic Ayurvedic and TCM wellness recipe.",
      version: 1
    });

    logger.info("Database successfully seeded with Sattva Kitchen recipes!");
    await disconnectDB();
    process.exit(0);
  } catch (err) {
    logger.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedDB();
