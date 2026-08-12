import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { z } from "zod";

import { PrismaClient } from "./generated/prisma/client";

const MUNICIPIOS_CEARA_URL =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios";

const municipioIbgeSchema = z.object({
  id: z.number().int().positive(),
  nome: z.string().trim().min(1),
  "regiao-imediata": z.object({
    id: z.number().int().positive(),
    nome: z.string().trim().min(1),
  }),
});

const municipiosIbgeSchema = z.array(municipioIbgeSchema).min(1);

async function buscarMunicipiosDoCeara() {
  const response = await fetch(MUNICIPIOS_CEARA_URL, {
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(
      `Não foi possível consultar os municípios no IBGE. Status: ${response.status}`,
    );
  }

  return municipiosIbgeSchema.parse(await response.json());
}

async function main() {
  const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Configure DIRECT_URL ou DATABASE_URL para executar a seed.");
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  try {
    const municipios = await buscarMunicipiosDoCeara();
    const tamanhoDoLote = 10;

    for (let inicio = 0; inicio < municipios.length; inicio += tamanhoDoLote) {
      const lote = municipios.slice(inicio, inicio + tamanhoDoLote);

      await Promise.all(
        lote.map((municipio) => {
          const regiaoImediata = municipio["regiao-imediata"];
          const data = {
            nome: municipio.nome,
            regiaoImediataId: regiaoImediata.id,
            regiaoImediataNome: regiaoImediata.nome,
          };

          return prisma.municipio.upsert({
            where: { id: municipio.id },
            create: {
              id: municipio.id,
              ...data,
            },
            update: data,
          });
        }),
      );
    }

    console.log(`${municipios.length} municípios do Ceará foram carregados.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Erro ao alimentar a tabela de municípios:", error);
  process.exitCode = 1;
});
