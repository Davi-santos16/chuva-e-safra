import { Router } from "express";

import { AccessRequestsController } from "@/controllers/accessRequestsController";

const accessRequestsRoutes = Router();
const controller = new AccessRequestsController();

accessRequestsRoutes.post("/", controller.create);
accessRequestsRoutes.get("/:protocol", controller.show);

export { accessRequestsRoutes };
