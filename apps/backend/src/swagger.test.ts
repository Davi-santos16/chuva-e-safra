import assert from "node:assert/strict";
import test from "node:test";

import { swaggerDocument } from "@/docs/swagger";

test("documenta todas as rotas públicas do backend", () => {
  assert.equal(swaggerDocument.openapi, "3.0.3");
  assert.ok(swaggerDocument.paths["/auth/register"].post);
  assert.ok(swaggerDocument.paths["/auth/login"].post);
  assert.ok(swaggerDocument.paths["/municipios/regioes-imediatas"].get);
  assert.ok(swaggerDocument.paths["/municipios"].get);
  assert.ok(swaggerDocument.paths["/analises"].get);
});

test("protege a listagem de municípios do técnico", () => {
  assert.deepEqual(swaggerDocument.paths["/municipios"].get.security, [
    { bearerAuth: [] },
  ]);
});

test("documenta os campos obrigatórios de cadastro para cada tipo de usuário", () => {
  const registerSchema = swaggerDocument.components.schemas.RegisterRequest;

  assert.equal(registerSchema.oneOf.length, 3);
  assert.equal(registerSchema.discriminator.propertyName, "role");

  assert.deepEqual(
    swaggerDocument.components.schemas.RegisterProdutorRequest.required,
    ["name", "email", "password", "role", "municipio"],
  );
  assert.deepEqual(
    swaggerDocument.components.schemas.RegisterTecnicoRequest.required,
    ["name", "email", "password", "role", "regiaoImediataId"],
  );
  assert.deepEqual(
    swaggerDocument.components.schemas.RegisterGestorRequest.required,
    ["name", "email", "password", "role"],
  );
});

test("restringe o valor de role em cada contrato de cadastro", () => {
  assert.deepEqual(
    swaggerDocument.components.schemas.RegisterProdutorRequest.properties.role.enum,
    ["PRODUTOR"],
  );
  assert.deepEqual(
    swaggerDocument.components.schemas.RegisterTecnicoRequest.properties.role.enum,
    ["TECNICO_COOPERATIVA"],
  );
  assert.deepEqual(
    swaggerDocument.components.schemas.RegisterGestorRequest.properties.role.enum,
    ["GESTOR_PUBLICO"],
  );
});

test("documenta autenticação JWT na rota de análises", () => {
  assert.deepEqual(swaggerDocument.paths["/analises"].get.security, [
    { bearerAuth: [] },
  ]);
  assert.equal(
    swaggerDocument.components.securitySchemes.bearerAuth.scheme,
    "bearer",
  );
});
