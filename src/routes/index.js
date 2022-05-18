import express from "express";
import quizRouter from "./quizRouter";
import rootRouter from "./rootRouter";
import foodRouter from "./foodRouter";

const router = express.Router();

router.use("/", rootRouter);
router.use("/quiz", quizRouter);
router.use("/food",foodRouter);

export default router;
