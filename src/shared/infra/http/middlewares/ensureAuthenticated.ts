import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token Inválido", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, auth.secret_token) as IPayload;

    req.user = {
      id: sub,
    };
    next();
  } catch {
    throw new AppError("Token Inválido", 401);
  }
}
