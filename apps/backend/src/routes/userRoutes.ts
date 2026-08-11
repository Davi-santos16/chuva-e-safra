import { UserController } from "../controllers/userController";
import { Router } from "express";
import { checkInputsUser } from "../middlewares/checkInputsUser"
import { SessionsController } from "@/controllers/sessionsController";

const UserRouter = Router();

const userController = new UserController();
const sessionsController = new SessionsController();

//UserRouter.get("/", userController.index);
UserRouter.post("/register", checkInputsUser, userController.create);
UserRouter.post("/login", sessionsController.create);

export { UserRouter };
