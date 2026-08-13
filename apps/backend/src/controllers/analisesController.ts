import { Request, Response } from "express";
import { z } from "zod";
import { isAxiosError } from "axios";

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

const perfilPorRole: Record<Exclude<UserRole, "ADMIN">, PerfilAnalise> = {
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

function codigosMunicipios(municipios: string) {
  return [
    ...new Set(
      normalizarMunicipios(municipios)
        .split(",")
        .map(Number),
    ),
  ];
}

interface ApiDadosError {
  detail?: string | Array<{ msg?: string }>;
  message?: string;
}

function mensagemApiDados(error: unknown) {
  if (!isAxiosError<ApiDadosError>(error)) return null;

  const data = error.response?.data;
  if (typeof data?.detail === "string") return data.detail;

  if (Array.isArray(data?.detail)) {
    const mensagens = data.detail
      .map((item) => item.msg)
      .filter((mensagem): mensagem is string => Boolean(mensagem));

    if (mensagens.length > 0) return mensagens.join(" ");
  }

  return data?.message ?? null;
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
        regiaoImediataId: true,
        uf: true,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    if (user.role === "ADMIN") {
      throw new AppError("Administradores não possuem escopo de análise agrícola.", 403);
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

      if (!user.regiaoImediataId) {
        throw new AppError("Técnico não possui região imediata cadastrada.");
      }

      const codigos = codigosMunicipios(municipios);
      const municipiosPermitidos = await prisma.municipio.findMany({
        where: {
          id: { in: codigos },
          regiaoImediataId: user.regiaoImediataId,
        },
        select: { id: true },
      });

      if (municipiosPermitidos.length !== codigos.length) {
        throw new AppError(
          "Um ou mais municípios não pertencem à região imediata do técnico.",
          403,
        );
      }

      params.municipios = codigos.join(",");
    }

    if (user.role === "GESTOR_PUBLICO") {
      const uf = user.uf

      if (uf !== "CE") {
        throw new AppError("A UF do gestor deve ser CE.");
      }

      params.uf = uf;
    }

    let apiResponse;

    try {
      apiResponse = await api.get("/analises", { params });
    } catch (error) {
      if (!isAxiosError(error)) throw error;

      const status = error.response?.status;
      const mensagem = mensagemApiDados(error);

      if (status && status >= 400 && status < 500) {
        throw new AppError(
          mensagem ?? "Os filtros informados não são aceitos pela base de análises.",
          status,
        );
      }

      throw new AppError(
        "O serviço de dados agrícolas está indisponível no momento. Tente novamente mais tarde.",
        502,
      );
    }

    return response.status(200).json({ data: apiResponse.data });
  }
}

export { AnalisesController };
