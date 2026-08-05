import mongoose, { Schema, Document } from "mongoose";

export interface IMealPlanDocument extends Document {
  userId?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  days: {
    dayName: string;
    recipes: { mealType: string; recipeId: mongoose.Types.ObjectId }[];
  }[];
}

const MealPlanSchema = new Schema<IMealPlanDocument>(
  {
    userId: { type: String, default: "guest_session" },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: [
      {
        dayName: { type: String, required: true },
        recipes: [
          {
            mealType: { type: String, required: true },
            recipeId: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const MealPlan = mongoose.model<IMealPlanDocument>("MealPlan", MealPlanSchema);
