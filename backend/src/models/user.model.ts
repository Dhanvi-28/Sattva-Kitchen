import mongoose, { Schema, Document } from "mongoose";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  doshaType?: "Vata" | "Pitta" | "Kapha" | "Tridoshic";
  tcmConstitution?: string;
  dietaryPreferences?: string[];
  role: "user" | "admin";
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String },
    doshaType: { type: String, enum: ["Vata", "Pitta", "Kapha", "Tridoshic"] },
    tcmConstitution: { type: String },
    dietaryPreferences: [{ type: String }],
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUserDocument>("User", UserSchema);
