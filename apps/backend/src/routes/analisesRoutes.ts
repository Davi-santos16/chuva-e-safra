import { AnalisesController } from "@/controllers/analisesController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { Router } from "express";

const analisesRoutes = Router();
const controllerAnalise = new AnalisesController();

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
