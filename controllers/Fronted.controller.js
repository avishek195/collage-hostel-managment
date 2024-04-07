import UserModel from "../models/UserModel.js";
import AdminModel from "../models/AdminModel.js";
import { AdminData } from "../AdminData.js";
import { CollageData } from "../CollageData.js";
import getCurrentDate from "../Date/getCurrentDate.js";
import {
  initialState,
  localStorage,
} from "../LocalStorageData/LocalStorageData.js";
import {
  initialStateAdmin,
  localStorageAdmin,
} from "../LocalStorageData/LocalStorageAdmin.js";

export const mainPage = (req, res) => {
  console.log(initialStateAdmin);
  const allInitialState = {
    isLoggedInAdmin: initialStateAdmin?.isLoggedIn || false,
    isLoggedInUser: initialState?.isLoggedIn || false,
    data: initialState?.data || {},
  };
  console.log(allInitialState);
  res.render("index.ejs", { allInitialState });
};

export const ErrorPage = (req, res) => {
  res.render("error.ejs");
};

export const StudentRegister = async (req, res) => {
  try {
    console.log(req.body);
    const { E_no, password, cnf_password } = req.body;
    if (!E_no || !password || !cnf_password) {
      return res.redirect("/error");
    }

    if (password !== cnf_password) {
      return res.redirect("/error");
    }
    const id = Number(E_no);

    const collageStudent = CollageData.filter((e) => e.enrollmentNo === id);

    if (collageStudent.length === 0) {
      return res.redirect("/error");
    }
    console.log(collageStudent);

    const existUser = await UserModel.findOne({ E_no: id });
    console.log(existUser);
    if (existUser) {
      console.log("Exist user error");
      return res.redirect("/error");
    }

    const user = await new UserModel({
      name: collageStudent[0].name,
      email: collageStudent[0].email,
      E_no: id,
      password,
      ph_no: collageStudent[0].ph_no,
    });
    await user.save();
    console.log("");
    if (!user) {
      console.log("User not save error");
      return res.redirect("/error");
    }
    const token = await user.JWT();

    res.cookie("token", token, {
      httpOnly: true,
    });

    localStorage.setItem("data", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", true);
    initialState.isLoggedIn = true;
    initialState.data = user;

    return res.redirect("/home");
  } catch (e) {
    console.log(e);
    console.log("crash site");
    return res.redirect("/error");
  }
};

export const UserProfile = async (req, res) => {
  try {
    const { E_no } = req.params;
    const data = Number(E_no);
    console.log(data, "ID");
    const { id } = req.user;
    console.log(id, "USER ID");

    if (data !== id) {
      return res.redirect("/error");
    }
    // const user = await UserModel.findOne({ E_no: id });
    res.render("Student_Dash.ejs", { initialState });
  } catch (err) {
    return res.redirect("/error");
  }
};

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
    localStorage.clear();
    initialState.isLoggedIn = false;
    initialState.data = {};

    return res.redirect("/home");
    // res.status(200);
  } catch (e) {
    console.log("Error in signOut part", e);
    return res.redirect("/error");
  }
};

export const StudentLogIn = async (req, res, next) => {
  try {
    const { E_no, password } = req.body;

    if (!E_no || !password) {
      return res.redirect("/error");
    }

    const id = Number(E_no);

    const user = await UserModel.findOne({ E_no: id });

    if (!user) {
      return res.redirect("/error");
    }

    const isTrue = await user.comparePassword(password, user.password);
    console.log(isTrue);
    if (isTrue === false) {
      return res.redirect("/error");
    }

    const token = await user.JWT();
    res.cookie("token", token, {
      httpOnly: true,
    });
    localStorage.setItem("data", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", true);
    initialState.isLoggedIn = true;
    initialState.data = user;
    return res.redirect("/home");
  } catch (err) {
    console.log("Error in LogIn Part", err);
    return res.redirect("/error");
  }
};

export const aboutPage = (req, res) => {
  res.render("about.ejs");
};

export const contactPage = (req, res) => {
  res.render("contact.ejs");
};

export const bookingPage = async (req, res) => {
  res.render("booking.ejs");
};

export const adminLoginPage = (req, res) => {
  res.render("admin_login.ejs");
};

export const adminRegisterPage = (req, res) => {
  res.render("Admin_Log_sign.ejs");
};

export const viewComplainPage = async (req, res) => {
  // const datas = await getDataFromComplaine(req.params);
  res.render("complain.ejs", { data: initialState.data });
};

export const studentRegisterPage = (req, res) => {
  res.render("student_register.ejs");
};

export const studenLoginPage = (req, res) => {
  res.render("Student_log_sign.ejs");
};

export const roombookingPage = async (req, res) => {
  const user = await UserModel.find({});

  const final = user.filter((e) => {
    return e.room.isBooked === true;
  });
  console.log(final);
  res.render("Booking_page.ejs", { initialState, final });
};

export const viewComplain = async (req, res) => {
  const newData = await UserModel.find({});
  console.log(newData);
  const final = newData.filter((e) => e.room.isBooked);
  console.log(final);

  // console.log(newData);
  localStorageAdmin.setItem("data", JSON.stringify(final));
  localStorageAdmin.setItem("isLoggedIn", true);
  initialStateAdmin.isLoggedIn = true;
  initialStateAdmin.data = final;
  res.render("Admin_Complain.ejs", {
    datas: initialStateAdmin.data,
  });
};

export const Createcomplaine = async (req, res) => {
  try {
    const E_id = Number(req.body.E_no);
    const { id } = req.user;
    console.log(E_id, id);
    if (E_id !== id) {
      return res.redirect("/error");
    }

    const { complain_type, description } = req.body;
    if (!complain_type || !description) {
      return res.redirect("/error");
    }

    const user = await UserModel.findOne({ E_no: E_id });

    if (!user) {
      return res.rediret("/error");
    }

    let newComplain = {
      complain_Date: getCurrentDate(),
      complain_type,
      description,
    };

    user.complains.push(newComplain);
    await user.save();

    localStorage.setItem("data", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", true);
    initialState.isLoggedIn = true;
    initialState.data = user;
    res.redirect(`/usercomplain/${E_id}`);
  } catch (err) {
    return res.rediret("/error");
  }
};

export const deleteDataCom = async (req, res) => {
  try {
    // console.log("Param", req.params);
    const paramId = req.params;
    const { id } = req.user;
    console.log(id);
    // console.log("tokenId", id);
    console.log(Number(paramId.E_no) === id);
    if (Number(paramId.E_no) !== id) {
      return res.redirect("/error");
    }
    const complainUser = await UserModel.findOne({ E_no: id });

    const newComplain = complainUser.complains.filter((e) => {
      // console.log(e._id.toHexString() !== paramId.c_id);
      return e._id.toHexString() !== paramId.c_id;
    });
    // console.log(newComplain);
    complainUser.complains = [...newComplain];
    await complainUser.save();

    localStorage.setItem("data", JSON.stringify(complainUser));
    localStorage.setItem("isLoggedIn", true);
    initialState.isLoggedIn = true;
    initialState.data = complainUser;

    res.redirect(`/usercomplain/${id}`);
  } catch (err) {
    return res.redirect("/error");
  }
};

export const adminRegister = async (req, res) => {
  try {
    const { E_no, password, confirmpass } = req.body;
    console.log(req.body);
    if (!E_no || !password || !confirmpass) {
      return res.redirect("/error");
    }
    console.log(password !== confirmpass);
    if (password !== confirmpass) {
      return res.redirect("/error");
    }
    const id = Number(E_no);

    //Checking The Admin is Registerd or not
    const collageAdmin = AdminData.filter((e) => e.enrollmentNo === id);
    console.log(collageAdmin);
    if (collageAdmin.length === 0) {
      return res.redirect("/error");
    }
    const existUser = await AdminModel.findOne({ E_no: id });
    if (existUser) {
      return res.redirect("/error");
    }

    const user = await new AdminModel({
      name: collageAdmin[0].name,
      email: collageAdmin[0].email,
      E_no,
      password,
      ph_no: collageAdmin[0].ph_no,
    });
    await user.save();
    if (!user) {
      return res.redirect("/error");
    }
    const token = await user.JWT();

    res.cookie("token", token, {
      httpOnly: true,
    });

    const newData = await UserModel.find({});

    localStorageAdmin.setItem("data", JSON.stringify(newData));
    localStorageAdmin.setItem("isLoggedIn", true);
    initialStateAdmin.isLoggedIn = true;
    initialStateAdmin.data = newData;

    return res.redirect("/adminprofile");
  } catch (err) {
    return res.redirect("/error");
  }
};

export const AdminProfile = async (req, res) => {
  const newData = await UserModel.find({});
  console.log(newData);
  const final = newData.filter((e) => e.room.isBooked);
  console.log(final);

  // console.log(newData);
  localStorageAdmin.setItem("data", JSON.stringify(final));
  localStorageAdmin.setItem("isLoggedIn", true);
  initialStateAdmin.isLoggedIn = true;
  initialStateAdmin.data = final;
  res.render("Admin_MainPaage.ejs", { initialStateAdmin });
};

export const adminLogin = async (req, res) => {
  try {
    const { E_no, password } = req.body;
    console.log(req.body);
    const id = Number(E_no);

    const user = await AdminModel.findOne({ E_no: id });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not Found",
      });
    }
    const isTrue = await user.comparePassword(password);
    console.log(isTrue);
    if (!isTrue) {
      return res.status(400).send({
        success: false,
        message: "Wrong Passsword",
      });
    }

    const token = await user.JWT();
    res.cookie("token", token, {
      httpOnly: true,
    });

    user.password = undefined;

    const newData = await UserModel.find({});
    console.log(newData);
    const final = newData.filter((e) => e.room.isBooked);
    console.log(final);

    // console.log(newData);
    localStorageAdmin.setItem("data", JSON.stringify(final));
    localStorageAdmin.setItem("isLoggedIn", true);
    initialStateAdmin.isLoggedIn = true;
    initialStateAdmin.data = final;

    return res.redirect("/adminprofile");
  } catch (err) {
    console.log("Error in LogIn Part", err);
    return res.status(400).send({
      success: false,
      message: "LogIn Server is Not Working",
    });
  }
};

export const AdminLogOut = (req, res) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "token  is alredy removed",
      });
    }
    res.cookie("token", token, { maxAge: 0 });
    localStorageAdmin.clear();
    initialStateAdmin.isLoggedIn = false;
    initialStateAdmin.data = {};
    console.log(initialStateAdmin);

    return res.redirect("/home");
    // res.status(200);
  } catch (e) {
    console.log("Error in signOut part", e);
    return res.status(400).send({
      success: false,
      message: "Signout Server is Not Working",
    });
  }
};

export const bookedRoom = async (req, res) => {
  try {
    const { id } = req.user;
    const { room_id } = req.params;
    const E_no = Number(id);
    if (E_no !== id) {
      return res.status(400).send({
        success: false,
        message: "id not matched",
      });

      // return res.redirect("/error")
    }
    const user = await UserModel.findOne({ E_no });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not found",
      });
      // return res.redirect("/error")
    }

    user.room.isBooked = true;
    user.room.bookingDate = getCurrentDate();
    user.room.roomId = room_id;
    await user.save();

    localStorage.setItem("data", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", true);
    initialState.isLoggedIn = true;
    initialState.data = user;
    console.log(initialState);

    return res.redirect(`/viewprofile/${user.E_no}`);

    // return res.render()
  } catch (err) {
    console.log(err);
    return res.redirect("/error");
  }
};

export const Payment = (req, res) => {
  try {
    const { room_id } = req.params;
    return res.render("Payment.ejs", { room: room_id });
  } catch (err) {
    return res.redirect("/error");
  }
};

export const Unboooked = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "ID");
    const E_no = Number(id);

    const user = await UserModel.findOne({ E_no });
    if (!user) {
      return res.redirect("/error");
    }
    user.room.isBooked = false;
    user.room.roomId = null;
    user.room.complains = [];

    await user.save();

    localStorage.setItem("data", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", true);
    initialState.isLoggedIn = true;
    initialState.data = user;

    return res.redirect(`/viewprofile/${E_no}`);
  } catch (err) {
    return res.redirect("/error");
  }
};
