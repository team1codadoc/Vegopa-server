import express from "express";
import userRouter from "./userRouter";
import quizRouter from "./quizRouter";
import rootRouter from "./rootRouter";
import foodRouter from "./foodRouter";
import partyRouter from "./partyRouter";

const router = express.Router();

router.use("/", rootRouter);
router.use("/quiz", quizRouter);
router.use("/food", foodRouter);
router.use("/user", userRouter);
router.use("/party", partyRouter);

export default router;
