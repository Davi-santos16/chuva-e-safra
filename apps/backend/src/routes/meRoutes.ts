import { Router } from "express";

import { MeController } from "@/controllers/meController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";

const meRoutes = Router();
const meController = new MeController();

meRoutes.get("/", ensureAuthenticated, meController.show);

export { meRoutes };
