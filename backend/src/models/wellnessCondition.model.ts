import mongoose, { Schema, Document } from "mongoose";

export interface IWellnessConditionDocument extends Document {
  id: string;
  name: string;
  category: "Dosha" | "TCM Element" | "Goal" | "Diet";
  description: string;
  recommendedTags: string[];
}

const WellnessConditionSchema = new Schema<IWellnessConditionDocument>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Dosha", "TCM Element", "Goal", "Diet"],
      required: true,
    },
    description: { type: String, required: true },
    recommendedTags: [{ type: String }],
  },
  { timestamps: true }
);

export const WellnessCondition = mongoose.model<IWellnessConditionDocument>(
  "WellnessCondition",
  WellnessConditionSchema
);
