import { Router } from "express";
import { UserRouter } from "./userRoutes";
import { analisesRoutes } from "./analisesRoutes";
import { municipiosRoutes } from "./municipiosRoutes";

const routes = Router();

routes.use("/auth", UserRouter)
routes.use("/analises",analisesRoutes )
routes.use("/municipios", municipiosRoutes)

export { routes };
