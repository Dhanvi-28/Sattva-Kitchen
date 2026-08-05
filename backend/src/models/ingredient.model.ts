import mongoose, { Schema, Document } from "mongoose";

export interface IIngredientDocument extends Document {
  name: string;
  category: string;
  ayurvedicEnergy?: "Heating" | "Cooling" | "Neutral";
  tcmNature?: "Warming" | "Cooling" | "Neutral";
  caloriesPer100g?: number;
}

const IngredientMasterSchema = new Schema<IIngredientDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true },
    ayurvedicEnergy: { type: String, enum: ["Heating", "Cooling", "Neutral"] },
    tcmNature: { type: String, enum: ["Warming", "Cooling", "Neutral"] },
    caloriesPer100g: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const IngredientMaster = mongoose.model<IIngredientDocument>(
  "IngredientMaster",
  IngredientMasterSchema
);
