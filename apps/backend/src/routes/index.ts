import { Router } from "express";
import { UserRouter } from "./userRoutes";

const routes = Router();

routes.use("/user", UserRouter)

export { routes };