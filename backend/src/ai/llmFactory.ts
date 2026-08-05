import { IAIProvider } from "./interfaces/aiProvider.interface.js";
import { OpenAIProvider } from "./providers/openAIProvider.js";
import { ClaudeProvider } from "./providers/claudeProvider.js";
import { GeminiProvider } from "./providers/geminiProvider.js";
import { DeepSeekProvider } from "./providers/deepseekProvider.js";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

export class LLMFactory {
  public static getProvider(providerName?: string): IAIProvider {
    const target = (providerName || env.aiProvider).toLowerCase();

    switch (target) {
      case "openai":
        return new OpenAIProvider(env.openaiApiKey);
      case "claude":
      case "anthropic":
        return new ClaudeProvider(env.anthropicApiKey);
      case "deepseek":
        return new DeepSeekProvider(env.deepseekApiKey);
      case "gemini":
      default:
        logger.info(`Using default provider [Gemini]`);
        return new GeminiProvider(env.geminiApiKey);
    }
  }
}
