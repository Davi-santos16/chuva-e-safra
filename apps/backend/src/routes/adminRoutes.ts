import { Router } from "express";

import { AdminUsersController } from "@/controllers/adminUsersController";
import { AdminAccessRequestsController } from "@/controllers/adminAccessRequestsController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const adminRoutes = Router();
const adminUsersController = new AdminUsersController();
const adminAccessRequestsController = new AdminAccessRequestsController();

adminRoutes.use(ensureAuthenticated, verifyUserAuthorization(["ADMIN"]));
adminRoutes.get("/users", adminUsersController.index);
adminRoutes.post("/users", adminUsersController.create);
adminRoutes.get("/access-requests", adminAccessRequestsController.index);
adminRoutes.get("/access-requests/:id/document", adminAccessRequestsController.document);
adminRoutes.patch("/access-requests/:id/decision", adminAccessRequestsController.decide);

export { adminRoutes };
