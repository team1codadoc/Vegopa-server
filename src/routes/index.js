import express from "express";
import quizRouter from "./quizRouter";
import rootRouter from "./rootRouter";
import foodRouter from "./foodRouter";
import userRouter from "./userRouter";

const router = express.Router();

router.use("/", rootRouter);
router.use("/quiz", quizRouter);
router.use("/food", foodRouter);
router.use("/user", userRouter);

export default router;
