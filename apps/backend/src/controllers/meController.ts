import { Request, Response } from "express";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class MeController {
  async show(request: Request, response: Response) {
    if (!request.user) {
      throw new AppError("Não autorizado", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: request.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        municipio: true,
        regiaoImediataId: true,
        uf: true,
        createdAT: true,
        updatedAT: true,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    return response.status(200).json({ user });
  }
}

export { MeController };
