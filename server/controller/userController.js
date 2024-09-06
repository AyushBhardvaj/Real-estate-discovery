import Listing from "../model/listingModel.js";
import User from "../model/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
// import { oauth2Client } from "../utils/outh2Client.js";
import sendToken from "../utils/sendToken.js";
import { v2 as cloudinary } from "cloudinary";
import { google } from "googleapis";
import fetch from "node-fetch";

// Register a new user
export const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password, profilePic } = req.body;
    console.log(req.body);
    console.log(JSON.parse(profilePic));

    if (!password) {
      return next(new ErrorHandler("Password needed", 401));
    }
    if (!profilePic) {
      return next(new ErrorHandler("Profile pic needed", 401));
    }

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 401));
    }

    const savedUser = await User.create({
      fullName,
      email,
      password,
      profilePic: {
        public_id: JSON.parse(profilePic).public_id,
        url: JSON.parse(profilePic).url,
      },
    });
    console.log(savedUser);

    sendToken(201, savedUser, res);
  } catch (error) {
    next(error);
  }
};

// Login a user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // I have not checked the availability of email and password in input as we will do in frontend
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(201, user, res);
  } catch (error) {
    next(error);
  }
};

// Logout the user
export const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(201).json({
      success: true,
      user: "logged out",
    });
  } catch (error) {
    next(error);
  }
};

// Login the user with Google open authentication
export const googleSignup = async (req, res, next) => {
  try {
    const code = req.query.code;

    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.COOKIES_ORIGIN
    );

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );
    const userInfo = await response.json();

    let user = await User.findOne({ email: userInfo.email });

    if (user) {
      return sendToken(200, user, res);
    }

    const myCloud = await cloudinary.uploader.upload(userInfo.picture, {
      folder: "Estate_Sphere",
      width: 150,
      crop: "scale",
    });

    const savedUser = await User.create({
      fullName: userInfo.name,
      email: userInfo.email,
      profilePic: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    sendToken(200, savedUser, res);
  } catch (error) {
    next(error);
  }
};

// Update the profile of user
export const updateProfile = async (req, res, next) => {
  try {
    if (req.body.profilePic) {
      await cloudinary.uploader.destroy(req.user.profilePic.public_id);

      req.body.profilePic = {
        public_id: JSON.parse(req.body.profilePic).public_id,
        url: JSON.parse(req.body.profilePic).url,
      };
    }

    const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
      new: true,
      runValidators: true,
    });

    sendToken(200, user, res);
  } catch (error) {
    next(error);
  }
};

// Get all listings of a user
export const getUserListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ owner: req.user._id });
    res.status(201).json({
      success: true,
      listings,
    });
  } catch (error) {
    next(error);
  }
};
