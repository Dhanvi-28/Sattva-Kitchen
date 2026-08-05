import mongoose, { Schema, Document } from "mongoose";

export interface IShoppingListDocument extends Document {
  userId?: string;
  items: { name: string; quantity: string; checked: boolean }[];
}

const ShoppingListSchema = new Schema<IShoppingListDocument>(
  {
    userId: { type: String, default: "guest_session" },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        checked: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export const ShoppingList = mongoose.model<IShoppingListDocument>(
  "ShoppingList",
  ShoppingListSchema
);
