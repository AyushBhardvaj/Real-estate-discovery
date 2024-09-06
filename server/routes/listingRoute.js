import express from "express";
import { verifyAuth } from "../middleware/authMiddleware.js";
import {
  createListing,
  updateListing,
} from "../controller/listingController.js";
import multer from "multer";

// Multer Setup
const upload = multer();

const router = express.Router();

router.post("/", upload.none(), verifyAuth, createListing);
router.put("/:id", upload.none(), verifyAuth, updateListing);

export default router;
