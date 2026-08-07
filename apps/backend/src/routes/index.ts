import { Router } from "express";
import { UserRouter } from "./userRoutes";

const routes = Router();

routes.use("/auth", UserRouter)

export { routes };