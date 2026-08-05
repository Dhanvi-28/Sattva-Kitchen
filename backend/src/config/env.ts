import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().transform((v) => parseInt(v, 10)).default("5000"),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
  MONGODB_URI: z.string().default("mongodb://127.0.0.1:27017/sattva_kitchen"),
  JWT_SECRET: z.string().default("sattva_super_secret_jwt_key_2026"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  AI_PROVIDER: z.string().default("gemini"),
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  DEEPSEEK_API_KEY: z.string().optional(),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error("Invalid environment configuration:", parseResult.error.format());
  process.exit(1);
}

export const env = {
  nodeEnv: parseResult.data.NODE_ENV,
  port: parseResult.data.PORT,
  clientOrigin: parseResult.data.CLIENT_ORIGIN,
  mongoUri: parseResult.data.MONGODB_URI,
  jwtSecret: parseResult.data.JWT_SECRET,
  jwtExpiresIn: parseResult.data.JWT_EXPIRES_IN,
  aiProvider: parseResult.data.AI_PROVIDER,
  openaiApiKey: parseResult.data.OPENAI_API_KEY,
  anthropicApiKey: parseResult.data.ANTHROPIC_API_KEY,
  geminiApiKey: parseResult.data.GEMINI_API_KEY,
  deepseekApiKey: parseResult.data.DEEPSEEK_API_KEY,
  isProd: parseResult.data.NODE_ENV === "production",
  isTest: parseResult.data.NODE_ENV === "test",
};
