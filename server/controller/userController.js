import User from "../model/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const savedUser = await User.create({ name, email, password });
    sendToken(200, savedUser, res);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // I have not checked the availability of email and password in input as we will do in frontend
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(200, user, res);
  } catch (error) {
    next(error);
  }
};
