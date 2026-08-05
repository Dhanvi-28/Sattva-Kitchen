import mongoose, { Schema, Document } from "mongoose";

export interface IFavoriteDocument extends Document {
  userId?: string;
  recipeId: mongoose.Types.ObjectId;
}

const FavoriteSchema = new Schema<IFavoriteDocument>(
  {
    userId: { type: String, default: "guest_session" },
    recipeId: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  },
  { timestamps: true }
);

export const Favorite = mongoose.model<IFavoriteDocument>("Favorite", FavoriteSchema);
