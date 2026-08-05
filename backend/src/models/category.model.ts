import mongoose, { Schema, Document } from "mongoose";

export interface ICategoryDocument extends Document {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  recipeCount: number;
}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    recipeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategoryDocument>("Category", CategorySchema);
