import { initialState } from "../LocalStorageData/LocalStorageData.js";

const isRoomBook = async (req, res, next) => {
  try {
    if (initialState.data.room.roomId) {
      return res.redirect("/error");
    }
    return next();
  } catch (err) {
    return res.redirect("/error");
  }
};

export default isRoomBook;
