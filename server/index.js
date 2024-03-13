import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoute.js";
import { errorMiddleware } from "./middleware/error.js";

const app = express();
app.use(express.json());
dotenv.config();

app.use("/api/v1", userRoutes);

app.use(errorMiddleware);

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
