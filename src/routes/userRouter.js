import express from "express";

import { signup, accountValid, emailValid } from "../Controller/userController";

const userRouter = express.Router();

router.post("/signup", signup);
router.post("/emailvalid", emailValid);
router.post("/accountValid", accountValid);

export default userRouter;
