import UserModel from "../models/UserModel.js";

import {
  initialState,
  localStorage,
} from "../LocalStorageData/LocalStorageData.js";

//Student Register
// export const StudentRegister = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { E_no, password, cnf_password } = req.body;
//     if (!E_no || !password || !cnf_password) {
//       return res.render("error.ejs");
//     }

//     if (password !== cnf_password) {
//       return res.render("error.ejs");
//     }
//     const id = Number(E_no);

//     const collageStudent = CollageData.filter((e) => e.enrollmentNo === id);

//     if (collageStudent.length === 0) {
//       return res.render("error.ejs");
//     }
//     console.log(collageStudent);

//     const existUser = await UserModel.findOne({ E_no: id });
//     console.log(existUser);
//     if (existUser) {
//       console.log("Exist user error");
//       return res.render("error.ejs");
//     }

//     const user = await new UserModel({
//       name: collageStudent[0].name,
//       email: collageStudent[0].email,
//       E_no: id,
//       password,
//       ph_no: collageStudent[0].ph_no,
//     });
//     await user.save();
//     console.log("");
//     if (!user) {
//       console.log("User not save error");
//       return res.render("error.ejs");
//     }
//     const token = await user.JWT();

//     res.cookie("token", token, {
//       httpOnly: true,
//     });
//     console.log("DATA", user);

//     const info = { success: true, data: user };
//     return res.render("index.ejs", { info });
//   } catch (e) {
//     console.log(e);
//     console.log("crash site");
//     return res.render("error.ejs");
//   }
// };

//Student Login

// export const StudentLogIn = async (req, res, next) => {
//   try {
//     const { E_no, password } = req.body;

//     if (!E_no || !password) {
//       return res.render("error.ejs");
//     }

//     const id = Number(E_no);

//     const user = await UserModel.findOne({ E_no: id });

//     if (!user) {
//       return res.render("error.ejs");
//     }

//     const isTrue = await user.comparePassword(password);
//     if (isTrue === false) {
//       return res.render("error.ejs");
//     }
//     // console.log(user);

//     const token = await user.JWT();
//     res.cookie("token", token, {
//       httpOnly: true,
//     });
//     // localStorage.setItem("data", JSON.stringify(user));
//     // localStorage.setItem("isLoggedIn", true);
//     // initialState.isLoggedIn = true;
//     // initialState.data = user;
//     // console.log(JSON.parse(localStorage.getItem("data")));

//     const info = { success: true, data: user };
//     // console.log(info);
//     return res.render("index.ejs", { info });
//   } catch (err) {
//     console.log("Error in LogIn Part", err);
//     return res.render("error.ejs");
//   }
// };

//Student Logout

export const StudentLogOut = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "token  is alredy removed",
      });
    }
    res.cookie("token", token, { maxAge: 0 });
    return res.status(200).send({
      success: true,
      message: "User is successfully signed out",
    });
    // res.status(200);
  } catch (e) {
    console.log("Error in signOut part", e);
    return res.status(400).send({
      success: false,
      message: "Signout Server is Not Working",
    });
  }
};

//Room booking System
