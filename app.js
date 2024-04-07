import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
config();
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/js_file")));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(morgan("dev"));

import UserRoute from "./routes/UserRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import FrontedRoute from "./routes/FrontedRoute.js";

let currentDate = new Date();

// Extract day, month, and year from the current date
let day = currentDate.getDate();
let month = currentDate.getMonth() + 1; // Month starts from 0, so add 1
let year = currentDate.getFullYear();

// Pad day and month with leading zeros if necessary
if (day < 10) {
  day = "0" + day;
}
if (month < 10) {
  month = "0" + month;
}

// Format the date as dd/mm/yyyy
let formattedDate = day + "/" + month + "/" + year;

// Output the formatted date
console.log(formattedDate);

app.use("/", FrontedRoute);
app.use("/user", UserRoute);
app.use("/admin", AdminRoute);

app.use("*", (req, res) => {
  res.status(404).send("Opps!! Page Not Found");
});

export default app;
