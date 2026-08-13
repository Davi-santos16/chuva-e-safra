import assert from "node:assert/strict";
import test from "node:test";
import type { Request, Response } from "express";

import { ibgeApi } from "@/api/ibge";
import {
  CulturasController,
  culturasDisponiveis,
} from "@/controllers/culturasController";
import { prisma } from "@/database/prisma";

function responseMock() {
  return {
    statusCode: 200,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      this.body = body;
      return this;
    },
  };
}

test("mantém somente culturas com valor numérico no SIDRA", () => {
  assert.deepEqual(
    culturasDisponiveis([
      { D4C: "40122", V: "120" },
      { D4C: "40112", V: "-" },
      { D4C: "40119", V: "0" },
      { D4C: "40124", V: "999" },
    ]),
    [
      { code: 2711, label: "Milho (em grão)", value: "MILHO" },
      { code: 2708, label: "Mandioca", value: "MANDIOCA" },
    ],
  );
});

test("consulta o Ceará no SIDRA para o perfil gestor", async () => {
  const originalFindUnique = prisma.user.findUnique;
  const originalIbgeGet = ibgeApi.get;
  let capturedPath = "";

  prisma.user.findUnique = (async () => ({
    role: "GESTOR_PUBLICO",
    municipio: null,
    regiaoImediataId: null,
    uf: "CE",
  })) as unknown as typeof prisma.user.findUnique;
  ibgeApi.get = (async (path: string) => {
    capturedPath = path;
    return {
      data: [
        { D4C: "Produto (Código)", V: "Valor" },
        { D4C: "40102", V: "50" },
      ],
    };
  }) as typeof ibgeApi.get;

  try {
    const response = responseMock();
    await new CulturasController().index(
      {
        user: { id: "gestor-123", role: "GESTOR_PUBLICO" },
      } as Request,
      response as unknown as Response,
    );

    assert.match(capturedPath, /\/n3\/23\//);
    assert.deepEqual(response.body, {
      culturas: [{ code: 2692, label: "Arroz (em casca)", value: "ARROZ" }],
    });
  } finally {
    prisma.user.findUnique = originalFindUnique;
    ibgeApi.get = originalIbgeGet;
  }
});
