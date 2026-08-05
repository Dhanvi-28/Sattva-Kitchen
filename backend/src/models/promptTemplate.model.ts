import mongoose, { Schema, Document } from "mongoose";

export interface IPromptTemplateDocument extends Document {
  name: string;
  template: string;
  version: number;
}

const PromptTemplateSchema = new Schema<IPromptTemplateDocument>(
  {
    name: { type: String, required: true, unique: true },
    template: { type: String, required: true },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const PromptTemplate = mongoose.model<IPromptTemplateDocument>(
  "PromptTemplate",
  PromptTemplateSchema
);
