import { Request, Response } from "express";
import { z } from "zod";

import { api } from "@/api/config";
import { prisma } from "@/database/prisma";
import type { UserRole } from "../../prisma/generated/prisma/enums";
import { AppError } from "@/utils/AppError";

type PerfilAnalise = "PRODUTOR" | "TECNICO" | "GESTOR";

interface ParametrosAnalise {
  perfil: PerfilAnalise;
  cultura: string;
  de: number;
  ate: number;
  municipios?: string;
  uf?: string;
}

const perfilPorRole: Record<UserRole, PerfilAnalise> = {
  PRODUTOR: "PRODUTOR",
  TECNICO_COOPERATIVA: "TECNICO",
  GESTOR_PUBLICO: "GESTOR",
};

function normalizarMunicipios(municipios: string) {
  const codigos = municipios.split(",").map((codigo) => codigo.trim());
  const possuiCodigoInvalido = codigos.some(
    (codigo) => !/^23\d{5}$/.test(codigo),
  );

  if (possuiCodigoInvalido) {
    throw new AppError(
      "Municípios devem ser códigos IBGE de 7 dígitos do Ceará, separados por vírgula.",
    );
  }

  return codigos.join(",");
}

class AnalisesController {
  async index(request: Request, response: Response) {
    const querySchema = z.object({
      cultura: z.string("Cultura é obrigatória").trim().min(1, "Cultura é obrigatória"),
      de: z.coerce.number("Ano inicial é obrigatório").int("Ano inicial deve ser inteiro"),
      ate: z.coerce.number("Ano final é obrigatório").int("Ano final deve ser inteiro"),
      municipios: z.string().trim().optional(),
    });

    const { cultura, municipios, de, ate } = querySchema.parse(request.query);

    if (de > ate) {
      throw new AppError("O ano inicial não pode ser maior que o ano final.");
    }

    if (!request.user) {
      throw new AppError("Não autorizado", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: request.user.id },
      select: {
        role: true,
        municipio: true,
        uf: true,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const params: ParametrosAnalise = {
      perfil: perfilPorRole[user.role],
      cultura,
      de,
      ate,
    };

    if (user.role === "PRODUTOR") {
      if (!user.municipio) {
        throw new AppError("Produtor não possui município cadastrado.");
      }

      params.municipios = normalizarMunicipios(user.municipio);
    }

    if (user.role === "TECNICO_COOPERATIVA") {
      if (!municipios) {
        throw new AppError("Municípios são obrigatórios para técnico.");
      }

      params.municipios = normalizarMunicipios(municipios);
    }

    if (user.role === "GESTOR_PUBLICO") {
      const uf = user.uf 

      if (uf !== "CE") {
        throw new AppError("A UF do gestor deve ser CE.");
      }

      params.uf = uf;
    }

    const apiResponse = await api.get("/analises", { params });

    return response.status(200).json({ data: apiResponse.data });
  }
}

export { AnalisesController };
