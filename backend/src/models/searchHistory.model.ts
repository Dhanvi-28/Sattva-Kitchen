import mongoose, { Schema, Document } from "mongoose";

export interface ISearchHistoryDocument extends Document {
  query: string;
  filters?: Record<string, any>;
  resultCount: number;
}

const SearchHistorySchema = new Schema<ISearchHistoryDocument>(
  {
    query: { type: String, required: true },
    filters: { type: Schema.Types.Mixed },
    resultCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SearchHistory = mongoose.model<ISearchHistoryDocument>(
  "SearchHistory",
  SearchHistorySchema
);
