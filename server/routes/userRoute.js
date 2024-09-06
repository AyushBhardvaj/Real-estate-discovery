import express from "express";
import {
  getUserListings,
  updateProfile,
} from "../controller/userController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";
import multer from "multer";
import { deleteListing, updateListing } from "../controller/listingController.js";

// Multer Setup
const upload = multer();

const router = express.Router();

router.put("/profile", upload.none(), verifyAuth, updateProfile);
router.get("/listings", verifyAuth, getUserListings);
router.put("/listings/:id", verifyAuth, updateListing);
router.delete("/listings/:id", verifyAuth, deleteListing);

export default router;
