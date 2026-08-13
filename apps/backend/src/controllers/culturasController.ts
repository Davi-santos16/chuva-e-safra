import { isAxiosError } from "axios";
import { Request, Response } from "express";

import { ibgeApi } from "@/api/ibge";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

const ANO_INICIAL = 2010;
const ANO_FINAL = 2021;

const CULTURAS_ANALISAVEIS = [
  { code: 2711, ibgeCode: "40122", label: "Milho (em grão)", value: "MILHO" },
  { code: 2702, ibgeCode: "40112", label: "Feijão (em grão)", value: "FEIJÃO" },
  { code: 2692, ibgeCode: "40102", label: "Arroz (em casca)", value: "ARROZ" },
  { code: 2708, ibgeCode: "40119", label: "Mandioca", value: "MANDIOCA" },
  { code: 2720, ibgeCode: "40136", label: "Banana (cacho)", value: "BANANA" },
  { code: 2727, ibgeCode: "40145", label: "Coco-da-baía", value: "COCO-DA-BAÍA" },
] as const;

interface LinhaSidra {
  V?: string;
  D4C?: string;
}

function possuiValorNumerico(valor: string | undefined) {
  if (valor === undefined || valor.trim() === "") return false;
  return Number.isFinite(Number(valor));
}

export function culturasDisponiveis(linhas: LinhaSidra[]) {
  const codigosComDados = new Set(
    linhas
      .filter((linha) => possuiValorNumerico(linha.V))
      .map((linha) => linha.D4C)
      .filter((codigo): codigo is string => Boolean(codigo)),
  );

  return CULTURAS_ANALISAVEIS.filter(({ ibgeCode }) =>
    codigosComDados.has(ibgeCode),
  ).map(({ code, label, value }) => ({ code, label, value }));
}

class CulturasController {
  async index(request: Request, response: Response) {
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

    let nivelTerritorial: "n3" | "n6";
    let localidades: string;

    if (user.role === "PRODUTOR") {
      if (!user.municipio || !/^23\d{5}$/.test(user.municipio)) {
        throw new AppError("Produtor não possui município válido cadastrado.");
      }

      nivelTerritorial = "n6";
      localidades = user.municipio;
    } else if (user.role === "TECNICO_COOPERATIVA") {
      if (!user.regiaoImediataId) {
        throw new AppError("Técnico não possui região imediata cadastrada.");
      }

      const municipios = await prisma.municipio.findMany({
        where: { regiaoImediataId: user.regiaoImediataId },
        select: { id: true },
      });

      if (municipios.length === 0) {
        return response.status(200).json({ culturas: [] });
      }

      nivelTerritorial = "n6";
      localidades = municipios.map(({ id }) => id).join(",");
    } else if (user.role === "GESTOR_PUBLICO") {
      if (user.uf !== "CE") {
        throw new AppError("A UF do gestor deve ser CE.");
      }

      nivelTerritorial = "n3";
      localidades = "23";
    } else {
      throw new AppError(
        "Administradores não possuem escopo de análise agrícola.",
        403,
      );
    }

    const codigos = CULTURAS_ANALISAVEIS.map(({ ibgeCode }) => ibgeCode).join(",");
    const caminho = `/t/5457/${nivelTerritorial}/${localidades}/v/214/p/${ANO_INICIAL}-${ANO_FINAL}/c782/${codigos}`;

    try {
      const apiResponse = await ibgeApi.get<LinhaSidra[]>(caminho);
      const linhas = Array.isArray(apiResponse.data) ? apiResponse.data.slice(1) : [];

      return response.status(200).json({ culturas: culturasDisponiveis(linhas) });
    } catch (error) {
      if (!isAxiosError(error)) throw error;

      throw new AppError(
        "Não foi possível consultar as culturas disponíveis no IBGE. Tente novamente mais tarde.",
        502,
      );
    }
  }
}

export { CulturasController };
