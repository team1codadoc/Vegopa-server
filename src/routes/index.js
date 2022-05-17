import express from "express";
import quizRouter from "./quizRouter";
import rootRouter from "./rootRouter";

const router = express.Router();

router.use("/", rootRouter);
router.use("/quiz", quizRouter);

export default router;
