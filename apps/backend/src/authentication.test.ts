import assert from "node:assert/strict";
import test from "node:test";

import { hash } from "bcrypt";
import type { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

import { api } from "@/api/config";
import { authConfig } from "@/configs/auth";
import { AnalisesController } from "@/controllers/analisesController";
import { SessionsController } from "@/controllers/sessionsController";
import { prisma } from "@/database/prisma";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { checkInputsUser } from "@/middlewares/checkInputsUser";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const jwtSecret = "segredo-usado-apenas-nos-testes";
authConfig.jwt.secret = jwtSecret;

function responseMock() {
  const result = {
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

  return result;
}

test("cria uma sessão e inclui id e perfil no JWT", async () => {
  const password = "senha123";
  const passwordHash = await hash(password, 4);

  const originalFindUnique = prisma.user.findUnique;
  prisma.user.findUnique = (async () => ({
    id: "usuario-123",
    name: "Usuário",
    email: "usuario@example.com",
    password: passwordHash,
    role: "TECNICO_COOPERATIVA",
    municipio: null,
    regiaoImediataId: 230002,
    uf: null,
    createdAT: new Date(),
    updatedAT: null,
  })) as typeof prisma.user.findUnique;

  try {
    const response = responseMock();
    await new SessionsController().create(
      {
        body: { email: "usuario@example.com", password },
      } as Request,
      response as unknown as Response,
    );

    const token = (response.body as { token: string }).token;
    const payload = verify(token, jwtSecret) as { role: string; sub: string };

    assert.equal(payload.sub, "usuario-123");
    assert.equal(payload.role, "TECNICO_COOPERATIVA");
  } finally {
    prisma.user.findUnique = originalFindUnique;
  }
});

test("autentica um Bearer token válido e rejeita token inválido", () => {
  const token = sign({ role: "PRODUTOR" }, jwtSecret, {
    subject: "produtor-123",
  });
  const request = {
    headers: { authorization: `Bearer ${token}` },
  } as Request;
  let nextCalled = false;

  ensureAuthenticated(request, {} as Response, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.deepEqual(request.user, {
    id: "produtor-123",
    role: "PRODUTOR",
  });

  assert.throws(
    () =>
      ensureAuthenticated(
        { headers: { authorization: "Bearer token-invalido" } } as Request,
        {} as Response,
        () => undefined,
      ),
    (error: { statusCode?: number }) => error.statusCode === 401,
  );
});

test("reconhece ADMIN no JWT e protege o provisionamento administrativo", () => {
  const token = sign({ role: "ADMIN" }, jwtSecret, { subject: "admin-123" });
  const request = { headers: { authorization: `Bearer ${token}` } } as Request;

  ensureAuthenticated(request, {} as Response, () => undefined);
  assert.equal(request.user?.role, "ADMIN");

  assert.doesNotThrow(() =>
    verifyUserAuthorization(["ADMIN"])(request, {} as Response, () => undefined),
  );
  assert.throws(
    () =>
      verifyUserAuthorization(["ADMIN"])(
        { user: { id: "gestor-123", role: "GESTOR_PUBLICO" } } as Request,
        {} as Response,
        () => undefined,
      ),
    (error: { statusCode?: number }) => error.statusCode === 403,
  );

  let validationError: unknown;
  checkInputsUser(
    {
      body: {
        name: "Administrador",
        email: "admin@example.com",
        password: "senha123",
        role: "ADMIN",
      },
    } as Request,
    {} as Response,
    (error?: unknown) => {
      validationError = error;
    },
  );
  assert.ok(validationError, "ADMIN não deve ser aceito no cadastro público");
});

test("monta os filtros de análise conforme o perfil", async () => {
  const originalFindUnique = prisma.user.findUnique;
  const originalMunicipioFindMany = prisma.municipio.findMany;
  const originalApiGet = api.get;
  let currentUser: {
    role: "PRODUTOR" | "TECNICO_COOPERATIVA" | "GESTOR_PUBLICO";
    municipio: string | null;
    regiaoImediataId: number | null;
    uf: string | null;
  };
  let capturedParams: Record<string, unknown> = {};

  prisma.user.findUnique = (async () => currentUser) as unknown as typeof prisma.user.findUnique;
  prisma.municipio.findMany = (async ({ where }: { where?: { id?: { in?: number[] } } }) =>
    (where?.id?.in ?? []).map((id) => ({ id }))) as unknown as typeof prisma.municipio.findMany;
  api.get = (async (_url: string, config?: { params?: Record<string, unknown> }) => {
    capturedParams = config?.params ?? {};
    return { data: { ok: true } };
  }) as typeof api.get;

  const controller = new AnalisesController();
  const baseRequest = {
    query: { cultura: "milho", de: "2020", ate: "2025" },
    user: { id: "usuario-123", role: "PRODUTOR" },
  };

  try {
    currentUser = {
      role: "PRODUTOR",
      municipio: "2304400",
      regiaoImediataId: null,
      uf: null,
    };
    await controller.index(
      baseRequest as unknown as Request,
      responseMock() as unknown as Response,
    );
    assert.deepEqual(capturedParams, {
      perfil: "PRODUTOR",
      cultura: "milho",
      de: 2020,
      ate: 2025,
      municipios: "2304400",
    });

    currentUser = {
      role: "TECNICO_COOPERATIVA",
      municipio: null,
      regiaoImediataId: 230002,
      uf: null,
    };
    await controller.index(
      {
        ...baseRequest,
        query: { ...baseRequest.query, municipios: "2300754, 2306405" },
      } as unknown as Request,
      responseMock() as unknown as Response,
    );
    assert.deepEqual(capturedParams, {
      perfil: "TECNICO",
      cultura: "milho",
      de: 2020,
      ate: 2025,
      municipios: "2300754,2306405",
    });

    currentUser = {
      role: "GESTOR_PUBLICO",
      municipio: null,
      regiaoImediataId: null,
      uf: "CE",
    };
    await controller.index(
      baseRequest as unknown as Request,
      responseMock() as unknown as Response,
    );
    assert.deepEqual(capturedParams, {
      perfil: "GESTOR",
      cultura: "milho",
      de: 2020,
      ate: 2025,
      uf: "CE",
    });
  } finally {
    prisma.user.findUnique = originalFindUnique;
    prisma.municipio.findMany = originalMunicipioFindMany;
    api.get = originalApiGet;
  }
});
