import express from "express";

import {
  signup,
  accountValid,
  emailValid,
  login,
} from "../Controller/userController";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/emailValid", emailValid);
userRouter.post("/accountValid", accountValid);

export default userRouter;
