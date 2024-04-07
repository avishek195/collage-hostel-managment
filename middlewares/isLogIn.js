import Jwt from "jsonwebtoken";

const isLogIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
      return res.redirect("/error");
    }
    const decode = await Jwt.verify(token, process.env.SEC);
    req.user = decode;

    return next();
  } catch (e) {
    console.log("Erroe is in IsLogIN part");
  }
};

export default isLogIn;
