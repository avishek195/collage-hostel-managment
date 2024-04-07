import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  // role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

export { initialState, localStorage };
