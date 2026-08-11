import assert from "node:assert/strict";
import test from "node:test";

import { swaggerDocument } from "@/docs/swagger";

test("documenta todas as rotas públicas do backend", () => {
  assert.equal(swaggerDocument.openapi, "3.0.3");
  assert.ok(swaggerDocument.paths["/auth/register"].post);
  assert.ok(swaggerDocument.paths["/auth/login"].post);
  assert.ok(swaggerDocument.paths["/analises"].get);
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
