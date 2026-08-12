import { Request, Response } from "express";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class MunicipiosController {
  async todos(_request: Request, response: Response) {
    const municipios = await prisma.municipio.findMany({
      select: {
        id: true,
        nome: true,
        regiaoImediataId: true,
        regiaoImediataNome: true,
      },
      orderBy: { nome: "asc" },
    });

    return response.status(200).json({ municipios });
  }

  async regioesImediatas(_request: Request, response: Response) {
    const regioes = await prisma.municipio.findMany({
      distinct: ["regiaoImediataId"],
      select: {
        regiaoImediataId: true,
        regiaoImediataNome: true,
      },
      orderBy: { regiaoImediataNome: "asc" },
    });

    return response.status(200).json({ regioes });
  }

  async index(request: Request, response: Response) {
    if (!request.user) {
      throw new AppError("Não autorizado", 401);
    }

    const tecnico = await prisma.user.findUnique({
      where: { id: request.user.id },
      select: {
        regiaoImediataId: true,
      },
    });

    if (!tecnico) {
      throw new AppError("Usuário não encontrado", 401);
    }

    if (!tecnico.regiaoImediataId) {
      throw new AppError("Técnico não possui região imediata cadastrada.");
    }

    const municipios = await prisma.municipio.findMany({
      where: { regiaoImediataId: tecnico.regiaoImediataId },
      select: {
        id: true,
        nome: true,
      },
      orderBy: { nome: "asc" },
    });

    return response.status(200).json({ municipios });
  }
}

export { MunicipiosController };
