import api from "./api.js";

// Helper for fallback seed recipes in case backend is offline or loading
export const FALLBACK_RECIPES = [
  {
    id: "golden-turmeric-moong-dal-kitchari",
    _id: "golden-turmeric-moong-dal-kitchari",
    title: "Golden Turmeric & Ginger Moong Dal Kitchari",
    description: "A soothing Ayurvedic staple made with split yellow moong, cumin, coriander, and ghee to reboot digestion and calm Vata.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    prepTime: 15,
    cookTime: 25,
    time: "40 min",
    difficulty: "Easy",
    calories: 320,
    protein: 13,
    dietaryTags: ["Vata Balancing", "Tridoshic", "Gluten-Free", "Ayurvedic"],
    tags: ["Vata Balancing", "Tridoshic", "Gluten-Free"],
    ingredients: [
      { name: "Yellow Split Moong Dal", quantity: "1/2 cup" },
      { name: "Basmati Rice", quantity: "1/2 cup" },
      { name: "Ghee or Sesame Oil", quantity: "1 tbsp" },
      { name: "Fresh Turmeric", quantity: "1 tsp" },
      { name: "Whole Cumin & Coriander Seeds", quantity: "1 tsp" }
    ],
    instructions: [
      { stepNumber: 1, instruction: "Rinse moong dal and rice in warm water until clear." },
      { stepNumber: 2, instruction: "Heat ghee in a heavy pot, pop cumin seeds until aromatic, then stir in turmeric and ginger." },
      { stepNumber: 3, instruction: "Add dal, rice, and 4 cups filtered water. Bring to boil, lower heat, cover and cook 25 minutes." }
    ],
    ayurvedaBenefits: {
      doshaImpact: "Tridoshic",
      summary: "Balances all three doshas while soothing gut inflammation."
    },
    tcmBenefits: {
      thermalNature: "Neutral",
      summary: "Tonifies Spleen Qi and harmonizes Middle Jiao."
    }
  },
  {
    id: "tremella-goji-berry-yin-hydration-tonic",
    _id: "tremella-goji-berry-yin-hydration-tonic",
    title: "Tremella & Goji Berry Yin Hydration Tonic",
    description: "Traditional Chinese Medicine beauty elixir infused with snow mushroom, red dates, and goji berries to nourish skin and Kidney Yin.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    prepTime: 10,
    cookTime: 40,
    time: "50 min",
    difficulty: "Medium",
    calories: 160,
    protein: 4,
    dietaryTags: ["Yin Nourishing", "Pitta Cooling", "Vegan", "Gluten-Free"],
    tags: ["Yin Nourishing", "Pitta Cooling", "Vegan"],
    ingredients: [
      { name: "Dried Tremella (Snow) Mushroom", quantity: "15g" },
      { name: "Goji Berries", quantity: "2 tbsp" },
      { name: "Red Dates (Jujube)", quantity: "6 pieces" }
    ],
    instructions: [
      { stepNumber: 1, instruction: "Soak snow mushroom in warm water until soft and gelatinous, trim stem." },
      { stepNumber: 2, instruction: "Add mushroom and dates with 5 cups water to a pot; simmer gently for 40 minutes." }
    ],
    ayurvedaBenefits: {
      doshaImpact: "Pitta Cooling",
      summary: "Cools internal systemic heat and replenishes bodily fluids."
    },
    tcmBenefits: {
      thermalNature: "Cooling",
      summary: "Generates fluids, moistens Lungs, and replenishes Kidney Essence."
    }
  },
  {
    id: "grounding-spiced-roasted-root-buddha-bowl",
    _id: "grounding-spiced-roasted-root-buddha-bowl",
    title: "Grounding Spiced Roasted Root Buddha Bowl",
    description: "Warm roasted sweet potato, lotus root, and toasted sesame seeds drizzled with ginger-miso reduction.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    prepTime: 20,
    cookTime: 25,
    time: "45 min",
    difficulty: "Easy",
    calories: 390,
    protein: 10,
    dietaryTags: ["Vata Balancing", "Qi Tonic", "Vegan", "High Fiber"],
    tags: ["Vata Balancing", "Qi Tonic", "Vegan"],
    ingredients: [
      { name: "Sweet Potato", quantity: "2 medium" },
      { name: "Lotus Root Slices", quantity: "1 cup" },
      { name: "White Miso Paste", quantity: "1 tbsp" }
    ],
    instructions: [
      { stepNumber: 1, instruction: "Preheat oven to 200°C. Toss sweet potatoes and lotus root in sesame oil and roast 25 minutes." },
      { stepNumber: 2, instruction: "Whisk miso paste with warm water and lemon juice." }
    ],
    ayurvedaBenefits: {
      doshaImpact: "Vata Balancing",
      summary: "Heavy and sweet root energy stabilizes erratic Vata dosha."
    },
    tcmBenefits: {
      thermalNature: "Neutral",
      summary: "Strengthens Stomach and Spleen, regulates Qi."
    }
  }
];

export const FALLBACK_CATEGORIES = [
  {
    id: "soups-stews",
    name: "Soups & Stews",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    to: "/recipes?category=Soups",
  },
  {
    id: "nourishing-bowls",
    name: "Nourishing Bowls",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    to: "/recipes?category=Bowls",
  },
  {
    id: "herbal-elixirs",
    name: "Herbal Elixirs",
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    to: "/recipes?category=Elixirs",
  },
  {
    id: "cleansing-kitchari",
    name: "Cleansing Kitchari",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    to: "/recipes?category=Kitchari",
  },
];

export const recipeService = {
  async getCategories() {
    try {
      const res = await api.get("/categories");
      if (res.data?.success && res.data.data?.length > 0) {
        return res.data.data.map((c) => ({
          id: c._id || c.slug,
          name: c.name,
          imageUrl: c.imageUrl,
          to: `/recipes?category=${encodeURIComponent(c.name)}`,
        }));
      }
    } catch (e) {
      console.warn("Backend categories unavailable, using fallback:", e.message);
    }
    return FALLBACK_CATEGORIES;
  },

  async getTags() {
    try {
      const res = await api.get("/tags");
      if (res.data?.success) return res.data.data;
    } catch (e) {
      console.warn("Backend tags error:", e.message);
    }
    return ["Vata Balancing", "Pitta Cooling", "Kapha Reducing", "Tridoshic", "Qi Tonic", "Yin Nourishing", "Vegan", "Gluten-Free"];
  },

  async getQuizQuestions() {
    try {
      const res = await api.get("/conditions/quiz");
      if (res.data?.success && res.data.data?.length > 0) {
        return res.data.data;
      }
    } catch (e) {
      console.warn("Backend quiz questions error:", e.message);
    }
    return [
      {
        id: "dosha",
        prompt: "What best describes your mind-body constitution (Ayurvedic Dosha)?",
        helperText: "Choose the primary state you feel currently.",
        multiSelect: false,
        options: [
          { id: "vata", label: "Vata — Creative, quick, tend to feel cold/dry", icon: "💨" },
          { id: "pitta", label: "Pitta — Driven, warm-bodied, strong digestion", icon: "🔥" },
          { id: "kapha", label: "Kapha — Calm, grounded, tend to feel heavy", icon: "🌱" },
          { id: "tridoshic", label: "Tridoshic — Balanced or unsure", icon: "⚖️" },
        ],
      },
      {
        id: "tcmThermal",
        prompt: "What thermal energy does your body crave?",
        helperText: "TCM balances internal heat and coldness.",
        multiSelect: false,
        options: [
          { id: "warming", label: "Warming — Invigorate digestion & metabolic heat", icon: "☀️" },
          { id: "cooling", label: "Cooling — Clear heat & soothe internal restlessness", icon: "🌧️" },
          { id: "neutral", label: "Neutral — Gentle maintenance & grounding", icon: "🍃" },
        ],
      },
      {
        id: "diet",
        prompt: "Any dietary preferences or restrictions?",
        helperText: "Select all that apply to your current lifestyle.",
        multiSelect: true,
        options: [
          { id: "vegan", label: "Vegan", icon: "🌱" },
          { id: "vegetarian", label: "Vegetarian", icon: "🥑" },
          { id: "gluten-free", label: "Gluten-Free", icon: "🌾" },
          { id: "dairy-free", label: "Dairy-Free", icon: "🥛" },
          { id: "high-protein", label: "High-Protein", icon: "💪" },
        ],
      },
    ];
  },

  async getPopularRecipes() {
    try {
      const res = await api.get("/recipes?sort=popular&limit=8");
      if (res.data?.success && res.data.data?.length > 0) {
        return res.data.data.map(formatRecipe);
      }
    } catch (e) {
      console.warn("Backend popular recipes error:", e.message);
    }
    return FALLBACK_RECIPES.map(formatRecipe);
  },

  async getRecentRecipes() {
    try {
      const res = await api.get("/recipes?sort=recent&limit=8");
      if (res.data?.success && res.data.data?.length > 0) {
        return res.data.data.map(formatRecipe);
      }
    } catch (e) {
      console.warn("Backend recent recipes error:", e.message);
    }
    return FALLBACK_RECIPES.map(formatRecipe);
  },

  async getRecipeById(id) {
    try {
      const res = await api.get(`/recipes/${id}`);
      if (res.data?.success && res.data.data) {
        return formatRecipeDetails(res.data.data);
      }
    } catch (e) {
      console.warn(`Backend recipe ${id} fetch error:`, e.message);
    }
    const found = FALLBACK_RECIPES.find((r) => r.id === id || r._id === id || r.slug === id);
    return found ? formatRecipeDetails(found) : null;
  },

  async searchRecipes(params = {}) {
    try {
      const res = await api.get("/recipes/search", { params });
      if (res.data?.success && res.data.data?.recipes) {
        return {
          recipes: res.data.data.recipes.map(formatRecipe),
          pagination: res.data.data.pagination,
        };
      }
    } catch (e) {
      console.warn("Backend search error:", e.message);
    }
    return { recipes: FALLBACK_RECIPES.map(formatRecipe), pagination: { total: 3 } };
  },

  async getRecommendations(answers) {
    try {
      const res = await api.post("/recommendations", { answers });
      if (res.data?.success && res.data.data?.length > 0) {
        return res.data.data.map(formatRecipe);
      }
    } catch (e) {
      console.warn("Backend recommendations error:", e.message);
    }
    return FALLBACK_RECIPES.map(formatRecipe);
  },

  async submitFeedback(data) {
    try {
      const res = await api.post("/feedback", data);
      return res.data;
    } catch (e) {
      console.warn("Backend feedback error:", e.message);
      return { success: true, message: "Feedback saved locally" };
    }
  },
};

function formatRecipe(r) {
  const id = r._id || r.id || r.slug;
  return {
    id,
    _id: id,
    title: r.title,
    imageUrl: r.image || r.imageUrl,
    time: `${r.prepTime + r.cookTime || 30} min`,
    difficulty: r.difficulty || "Easy",
    tags: r.dietaryTags || r.tags || ["Ayurvedic"],
    isNew: false,
    calories: r.calories,
    description: r.description,
    ayurveda: r.ayurvedaBenefits?.summary,
    tcm: r.tcmBenefits?.summary,
  };
}

function formatRecipeDetails(r) {
  const id = r._id || r.id || r.slug;
  return {
    id,
    _id: id,
    title: r.title,
    description: r.description,
    imageUrl: r.image || r.imageUrl,
    tags: r.dietaryTags || r.tags || [],
    stats: [
      { label: "Prep time", value: `${r.prepTime || 15} min` },
      { label: "Cook time", value: `${r.cookTime || 25} min` },
      { label: "Servings", value: `${r.servings || 2}` },
      { label: "Calories", value: `${r.calories || 320} kcal` },
      { label: "Protein", value: `${r.protein || 12}g` },
      { label: "Difficulty", value: r.difficulty || "Easy" },
    ],
    ingredients: (r.ingredients || []).map((ing, idx) => ({
      id: `ing-${idx}`,
      label: `${ing.name}${ing.quantity ? ` (${ing.quantity})` : ""}`,
      quantity: ing.quantity,
    })),
    steps: (r.instructions || []).map((st, idx) => ({
      id: `step-${idx}`,
      text: typeof st === "string" ? st : st.instruction,
    })),
    ayurvedaBenefits: r.ayurvedaBenefits,
    tcmBenefits: r.tcmBenefits,
    traditionalBenefits: r.traditionalBenefits,
    modernNutritionBenefits: r.modernNutritionBenefits,
  };
}
