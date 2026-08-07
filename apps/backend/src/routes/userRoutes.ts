import { UserController } from "../controllers/userController";
import { Router } from "express";
import { checkInputsUser } from "../middlewares/checkInputsUser"

const UserRouter = Router();

const userController = new UserController();

//UserRouter.get("/", userController.index);
UserRouter.post("/register", checkInputsUser, userController.create);

export { UserRouter };