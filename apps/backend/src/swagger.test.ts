import assert from "node:assert/strict";
import test from "node:test";

import { swaggerDocument } from "@/docs/swagger";

test("documenta todas as rotas públicas do backend", () => {
  assert.equal(swaggerDocument.openapi, "3.0.3");
  assert.equal(swaggerDocument.servers[0].url, "/");
  assert.ok(swaggerDocument.paths["/auth/register"].post);
  assert.ok(swaggerDocument.paths["/auth/login"].post);
  assert.ok(swaggerDocument.paths["/me"].get);
  assert.ok(swaggerDocument.paths["/municipios/regioes-imediatas"].get);
  assert.ok(swaggerDocument.paths["/municipios/todos"].get);
  assert.ok(swaggerDocument.paths["/municipios"].get);
  assert.ok(swaggerDocument.paths["/analises"].get);
  assert.ok(swaggerDocument.paths["/analises/culturas"].get);
  assert.ok(swaggerDocument.paths["/admin/users"].get);
  assert.ok(swaggerDocument.paths["/admin/users"].post);
});

test("protege e documenta os dados do usuário autenticado", () => {
  assert.deepEqual(swaggerDocument.paths["/me"].get.security, [
    { bearerAuth: [] },
  ]);
  assert.equal(
    swaggerDocument.paths["/me"].get.responses["200"].content["application/json"].schema.$ref,
    "#/components/schemas/MeResponse",
  );
  assert.equal(
    "password" in swaggerDocument.components.schemas.CurrentUser.properties,
    false,
  );
});

test("mantém pública a listagem de todos os municípios", () => {
  assert.equal(
    "security" in swaggerDocument.paths["/municipios/todos"].get,
    false,
  );
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
  assert.deepEqual(swaggerDocument.paths["/analises/culturas"].get.security, [
    { bearerAuth: [] },
  ]);
});

test("protege a gestão de usuários e não expõe ADMIN no cadastro público", () => {
  assert.deepEqual(swaggerDocument.paths["/admin/users"].get.security, [
    { bearerAuth: [] },
  ]);
  assert.deepEqual(swaggerDocument.paths["/admin/users"].post.security, [
    { bearerAuth: [] },
  ]);
  assert.equal(swaggerDocument.components.schemas.RegisterRequest.oneOf.length, 3);
  assert.ok(swaggerDocument.components.schemas.UserRole.enum.includes("ADMIN"));
});
