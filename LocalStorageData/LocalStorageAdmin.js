import { LocalStorage } from "node-localstorage";
const localStorageAdmin = new LocalStorage("./scratchAdmin");

const initialStateAdmin = {
  isLoggedIn: JSON.parse(localStorageAdmin.getItem("isLoggedIn")) || false,
  // role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorageAdmin.getItem("data")) || {},
};

export { initialStateAdmin, localStorageAdmin };
