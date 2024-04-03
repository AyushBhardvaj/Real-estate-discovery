import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoute.js";
import { errorMiddleware } from "./middleware/error.js";
import passportAuth from "passport-google-oauth20";
import passport from "passport";
import User from "./model/userModel.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.COOKIES_ORIGIN,
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })
);

const GoogleStrategy = passportAuth.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const authUser = await User.findOne({ googleId: profile.id });
        if (authUser) {
          return cb(null, authUser);
        }
        let user = await User.create({
          googleId: profile.id,
          fullName: profile.displayName,
          email: profile.emails[0].value,
        });
        return cb(null, user);
      } catch (error) {
        cb(null, error);
      }
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failerRedirect: "/login", session: false }),
  (req, res) => {
    const token = req.user.getJWTToken();

    //options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      sameSite: "none",
      secure: true,
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options);
    res.redirect("http://localhost:3000/");
  }
);
app.use("/api/v1", userRoutes);

// Error management
app.use(errorMiddleware);

const port = process.env.PORT || 6000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
