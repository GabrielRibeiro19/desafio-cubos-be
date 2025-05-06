import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { IRateLimiterProvider } from "@shared/container/providers/RateLimiterProvider/IRateLimiterProvider";
import { AppError } from "@shared/errors/AppError";

export async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const rateLimiterProvider = container.resolve<IRateLimiterProvider>(
      "RateLimiterProvider"
    );

    // Use o IP como chave para usuários não autenticados
    // ou o ID do usuário para usuários autenticados
    const key = request.user?.id || request.ip;

    await rateLimiterProvider.consume(key);

    return next();
  } catch (error) {
    throw new AppError(
      "Muitas requisições. Por favor, tente novamente mais tarde.",
      429
    );
  }
}
