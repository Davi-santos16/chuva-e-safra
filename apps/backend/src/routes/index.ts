import { Router } from "express";
import { UserRouter } from "./userRoutes";
import { analisesRoutes } from "./analisesRoutes";

const routes = Router();

routes.use("/auth", UserRouter)
routes.use("/analises",analisesRoutes )

export { routes };