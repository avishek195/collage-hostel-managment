import { Router } from "express";
import {
  mainPage,
  aboutPage,
  contactPage,
  adminRegisterPage,
  adminLoginPage,
  studentRegisterPage,
  studenLoginPage,
  roombookingPage,
  viewComplain,
  Createcomplaine,
  deleteDataCom,
  adminRegister,
  adminLogin,
  StudentRegister,
  UserProfile,
  StudentLogIn,
  StudentLogOut,
  AdminProfile,
  AdminLogOut,
  bookedRoom,
  ErrorPage,
  viewComplainPage,
  Payment,
  Unboooked,
} from "../controllers/Fronted.controller.js";
import isLogIn from "../middlewares/isLogIn.js";
import isRoomBook from "../middlewares/isRoomBook.js";

const FrontedRoute = Router();

FrontedRoute.get("/home", mainPage)
  .get("/viewprofile/:E_no", isLogIn, UserProfile)
  .get("/usercomplain/:E_no", isLogIn, viewComplainPage)
  .get("/logout", isLogIn, StudentLogOut)
  .get("/error", ErrorPage)
  .post("/login", StudentLogIn)
  .post("/register", StudentRegister)
  .get("/about", aboutPage)
  .get("/contact", contactPage)
  .get("/viewadminregister", adminRegisterPage)
  .get("/viewadminlogin", adminLoginPage)
  .get("/viewregister", studentRegisterPage)
  .get("/viewlogin", studenLoginPage)
  .get("/bookroom", isLogIn, isRoomBook, roombookingPage)
  .get("/adminprofile", isLogIn, AdminProfile)
  .get("/adminlogout", isLogIn, AdminLogOut)
  .get("/viewusercomplain", isLogIn, viewComplain)
  .post("/complaine", isLogIn, Createcomplaine)
  .get("/delete/:E_no/:c_id", isLogIn, deleteDataCom)
  .post("/registeradmin", adminRegister)
  .post("/loginadmin", adminLogin)
  .get("/payment/:room_id", isLogIn, Payment)
  .get("/bookroom/:room_id", isLogIn, bookedRoom)
  .get("/unbooked/:id", isLogIn, Unboooked);

export default FrontedRoute;
