import { Router } from "express";

import { AdminUsersController } from "@/controllers/adminUsersController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const adminRoutes = Router();
const adminUsersController = new AdminUsersController();

adminRoutes.use(ensureAuthenticated, verifyUserAuthorization(["ADMIN"]));
adminRoutes.get("/users", adminUsersController.index);
adminRoutes.post("/users", adminUsersController.create);

export { adminRoutes };
