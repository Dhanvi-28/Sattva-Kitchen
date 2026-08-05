import dotenv from "dotenv";

dotenv.config();

const required = ["MONGODB_URI"];

for (const key of required) {
  if (!process.env[key]) {
    // Fail fast on boot rather than surfacing a confusing error later.
    console.error(`[config] Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || "dev_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  isProd: process.env.NODE_ENV === "production",
};
