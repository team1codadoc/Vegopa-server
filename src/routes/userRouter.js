import express from "express";

import {
  signup,
  accountValid,
  emailValid,
  login,
  getUserInfo,
} from "../Controller/userController";

const userRouter = express.Router();

userRouter.post("/emailValid", emailValid);
userRouter.get("/profile/:username", getUserInfo);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/accountValid", accountValid);

export default userRouter;
