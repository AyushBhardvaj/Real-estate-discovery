import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new ErrorHandler("Please login to access this resource.", 401)
      );
    }

    const decodedId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedId.id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
