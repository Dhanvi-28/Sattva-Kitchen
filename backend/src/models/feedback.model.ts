import mongoose, { Schema, Document } from "mongoose";

export interface IFeedbackDocument extends Document {
  recipeId?: string;
  rating: number;
  comment?: string;
  userEmail?: string;
}

const FeedbackSchema = new Schema<IFeedbackDocument>(
  {
    recipeId: { type: Schema.Types.ObjectId, ref: "Recipe" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
    userEmail: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model<IFeedbackDocument>("Feedback", FeedbackSchema);
