import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/configs/auth";
import type { UserRole } from "../../prisma/generated/prisma/enums";
import { AppError } from "@/utils/AppError";

interface TokenPayload {
  role: UserRole;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token JWT não encontrado", 401);
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError("Token JWT inválido", 401);
  }

  const { secret } = authConfig.jwt;

  if (!secret) {
    throw new AppError("JWT_SECRET não configurado", 500);
  }

  try {
    const { role, sub: userId } = verify(token, secret) as TokenPayload;

    if (!userId || !role) {
      throw new Error("Token sem identificação do usuário");
    }

    request.user = {
      id: userId,
      role,
    };

    return next();
  } catch {
    throw new AppError("Token JWT inválido", 401);
  }
}

export { ensureAuthenticated };
