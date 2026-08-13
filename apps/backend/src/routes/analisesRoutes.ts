import { AnalisesController } from "@/controllers/analisesController";
import { CulturasController } from "@/controllers/culturasController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { Router } from "express";

const analisesRoutes = Router();
const controllerAnalise = new AnalisesController();
const controllerCulturas = new CulturasController();

analisesRoutes.get(
  "/culturas",
  ensureAuthenticated,
  verifyUserAuthorization([
    "PRODUTOR",
    "TECNICO_COOPERATIVA",
    "GESTOR_PUBLICO",
  ]),
  controllerCulturas.index,
);

analisesRoutes.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization([
    "PRODUTOR",
    "TECNICO_COOPERATIVA",
    "GESTOR_PUBLICO",
  ]),
  controllerAnalise.index,
);

export { analisesRoutes };
