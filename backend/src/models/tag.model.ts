import mongoose, { Schema, Document } from "mongoose";

export interface ITagDocument extends Document {
  name: string;
  slug: string;
  category: "Diet" | "Ayurveda" | "TCM" | "MealType" | "Season";
}

const TagSchema = new Schema<ITagDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: {
      type: String,
      enum: ["Diet", "Ayurveda", "TCM", "MealType", "Season"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Tag = mongoose.model<ITagDocument>("Tag", TagSchema);
