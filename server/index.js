import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import listingRoutes from "./routes/listingRoute.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// CORS Configuration
// app.use(
//   cors({
//     origin: process.env.COOKIES_ORIGIN,
//     credentials: true,
//     exposedHeaders: ["Set-Cookie"],
//   })
// );

app.use((req, res, next) => {
  console.log("Incoming Request Header: ", req.headers);

  res.on("finish", () => {
    console.log("Outgoing Response Headers:", res.getHeaders());
  });

  res.setHeader("Access-Control-Allow-Origin", process.env.COOKIES_ORIGIN);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, PATCH, POST, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization, Accept"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Respond immediately to OPTIONS requests
  }

  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware Configuration
app.use(express.static(path.join(__dirname, "build")));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Cloudinary Signature
app.post("/api/v1/upload-signature", (req, res) => {
  console.log("signature request received");

  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign = {
    timestamp: timestamp,
    folder: "Estate_Sphere",
  };
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUD_API_SECRET
  );
  res.json({ timestamp, signature, api_key: process.env.CLOUD_API_KEY });
});

app.post("/api/v1/delete-signature", (req, res) => {
  const { public_id } = req.body;

  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { public_id, timestamp },
    process.env.CLOUD_API_SECRET
  );

  res.json({ timestamp, signature });
});

//Routes
app.post("/api/v1/auth/login", (req, res) => {
  console.log("login request received");
  console.log("req.body: ", req.body);
  res.status(statusCode).json({
    success: true,
    user: "request working fine",
  });
});
// app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/listing", listingRoutes);

// Error management
app.use(errorMiddleware);

// Database Connection and Server Initialization
const port = process.env.PORT || 6000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
