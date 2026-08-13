import { Router } from "express";
import { UserRouter } from "./userRoutes";
import { analisesRoutes } from "./analisesRoutes";
import { municipiosRoutes } from "./municipiosRoutes";
import { adminRoutes } from "./adminRoutes";
import { meRoutes } from "./meRoutes";

const routes = Router();

routes.use("/auth", UserRouter)
routes.use("/analises",analisesRoutes )
routes.use("/municipios", municipiosRoutes)
routes.use("/admin", adminRoutes)
routes.use("/me", meRoutes)

export { routes };
