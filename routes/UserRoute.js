import { Router } from "express";
import { StudentLogOut } from "../controllers/User.controller.js";
import isLogIn from "../middlewares/isLogIn.js";
import {
  createComplain,
  deleteComplain,
} from "../controllers/Complain.controller.js";

const UserRoute = Router();

UserRoute
  // .post("/login", StudentLogIn)
  .get("/logout", isLogIn, StudentLogOut);

export default UserRoute;
