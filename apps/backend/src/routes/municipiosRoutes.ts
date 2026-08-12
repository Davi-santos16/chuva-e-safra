import { MunicipiosController } from "@/controllers/municipiosController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { Router } from "express";

const municipiosRoutes = Router();
const municipiosController = new MunicipiosController();

municipiosRoutes.get(
  "/regioes-imediatas",
  municipiosController.regioesImediatas,
);

municipiosRoutes.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["TECNICO_COOPERATIVA"]),
  municipiosController.index,
);

export { municipiosRoutes };
