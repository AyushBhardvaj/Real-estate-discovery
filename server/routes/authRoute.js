import express from "express";
import {
  googleSignup,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/userController.js";
import multer from "multer";

// Multer Setup
const upload = multer();

const router = express.Router();

router.post("/signup", upload.none(), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/google", googleSignup);

export default router;
