import { Router } from "express";
import { UserRouter } from "./userRoutes";
import { analisesRoutes } from "./analisesRoutes";
import { municipiosRoutes } from "./municipiosRoutes";
import { adminRoutes } from "./adminRoutes";
import { meRoutes } from "./meRoutes";
import { accessRequestsRoutes } from "./accessRequestsRoutes";

const routes = Router();

routes.use("/auth", UserRouter)
routes.use("/analises",analisesRoutes )
routes.use("/municipios", municipiosRoutes)
routes.use("/admin", adminRoutes)
routes.use("/me", meRoutes)
routes.use("/access-requests", accessRequestsRoutes)

export { routes };
