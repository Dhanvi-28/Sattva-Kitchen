import mongoose, { Schema, Document } from "mongoose";

export interface IAILogDocument extends Document {
  provider: string;
  action: string;
  prompt: string;
  response: string;
  latencyMs: number;
  tokensUsed?: number;
}

const AILogSchema = new Schema<IAILogDocument>(
  {
    provider: { type: String, required: true },
    action: { type: String, required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    latencyMs: { type: Number, required: true },
    tokensUsed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const AILog = mongoose.model<IAILogDocument>("AILog", AILogSchema);
