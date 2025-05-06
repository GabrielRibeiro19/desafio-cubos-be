import { NextFunction, Request, Response } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";

import { AppError } from "@shared/errors/AppError";

const authLimiter = new RateLimiterMemory({
  points: 5, // Número máximo de requisições
  duration: 60, // Por minuto (mais restritivo para login)
});

export async function authRateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Use o IP como chave
    await authLimiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError(
      "Muitas tentativas de login. Por favor, tente novamente mais tarde.",
      429
    );
  }
}
