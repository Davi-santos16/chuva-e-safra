import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { z } from "zod";

import { authConfig } from "@/configs/auth";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.email("E-mail inválido"),
      password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    });

    const { email, password } = bodySchema.parse(request.body);
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    if (!secret) {
      throw new AppError("JWT_SECRET não configurado", 500);
    }

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    });

    return response.json({ token });
  }
}

export { SessionsController };
