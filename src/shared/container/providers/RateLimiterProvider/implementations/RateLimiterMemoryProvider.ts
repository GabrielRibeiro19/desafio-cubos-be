import { RateLimiterMemory } from "rate-limiter-flexible";
import { injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class RateLimiterMemoryProvider {
  private limiter: RateLimiterMemory;

  constructor() {
    this.limiter = new RateLimiterMemory({
      points: 10, // Número máximo de requisições
      duration: 1, // Por segundo
    });
  }

  async consume(key: string): Promise<void> {
    try {
      await this.limiter.consume(key);
    } catch (err) {
      throw new AppError(
        "Muitas requisições. Por favor, tente novamente mais tarde.",
        429
      );
    }
  }
}

export { RateLimiterMemoryProvider };
