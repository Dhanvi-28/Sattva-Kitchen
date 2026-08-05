import mongoose, { Schema, Document } from "mongoose";
import { IRecipe } from "../interfaces/recipe.interface.js";

export interface IRecipeDocument extends Omit<IRecipe, "_id">, Document {}

const IngredientSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    quantity: { type: String, trim: true },
    unit: { type: String, trim: true },
    notes: { type: String, trim: true },
  },
  { _id: false }
);

const InstructionSchema = new Schema(
  {
    stepNumber: { type: Number, required: true },
    instruction: { type: String, required: true },
    tip: { type: String },
  },
  { _id: false }
);

const AyurvedaBenefitsSchema = new Schema(
  {
    doshaImpact: {
      type: String,
      enum: ["Vata Balancing", "Pitta Cooling", "Kapha Reducing", "Tridoshic"],
      required: true,
    },
    gunas: [{ type: String }],
    rasa: [{ type: String }],
    summary: { type: String, required: true },
  },
  { _id: false }
);

const TCMBenefitsSchema = new Schema(
  {
    thermalNature: {
      type: String,
      enum: ["Warming", "Cooling", "Neutral", "Hot", "Cold"],
      required: true,
    },
    targetOrgans: [{ type: String }],
    elementEffect: { type: String },
    summary: { type: String, required: true },
  },
  { _id: false }
);

const RecipeSchema = new Schema<IRecipeDocument>(
  {
    title: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: [IngredientSchema],
    instructions: [InstructionSchema],
    prepTime: { type: Number, required: true, min: 0 },
    cookTime: { type: Number, required: true, min: 0 },
    servings: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    calories: { type: Number, required: true, min: 0 },
    protein: { type: Number, required: true, min: 0 },
    fat: { type: Number, required: true, min: 0 },
    carbohydrates: { type: Number, required: true, min: 0 },
    fiber: { type: Number, required: true, min: 0 },
    vitamins: [{ type: String }],
    minerals: [{ type: String }],
    dietaryTags: [{ type: String, index: true }],
    allergens: [{ type: String }],
    bestTimeToEat: { type: String },
    storageInstructions: { type: String },
    cookingTips: [{ type: String }],
    traditionalBenefits: { type: String },
    modernNutritionBenefits: { type: String },
    ayurvedaBenefits: AyurvedaBenefitsSchema,
    tcmBenefits: TCMBenefitsSchema,
    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Elixir", "Soup"],
      required: true,
      index: true,
    },
    season: {
      type: String,
      enum: ["Spring", "Summer", "Autumn", "Winter", "All Seasons"],
      required: true,
      index: true,
    },
    isPopular: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: true,
  }
);

// Compound text index for MongoDB search
RecipeSchema.index({
  title: "text",
  description: "text",
  "ingredients.name": "text",
  dietaryTags: "text",
  traditionalBenefits: "text",
});

export const Recipe = mongoose.model<IRecipeDocument>("Recipe", RecipeSchema);
