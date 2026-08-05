import mongoose, { Schema, Document } from "mongoose";

export interface IRecipeCacheDocument extends Document {
  queryKey: string;
  recipes: any[];
  expiresAt: Date;
}

const RecipeCacheSchema = new Schema<IRecipeCacheDocument>(
  {
    queryKey: { type: String, required: true, unique: true },
    recipes: { type: Schema.Types.Mixed, required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true }
);

export const RecipeCache = mongoose.model<IRecipeCacheDocument>(
  "RecipeCache",
  RecipeCacheSchema
);
