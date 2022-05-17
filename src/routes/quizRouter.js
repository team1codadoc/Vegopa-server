import express from "express";
import { makeQuiz, getQuiz } from "../Controller/quizController";

const quizRouter = express.Router();

quizRouter.route("/").get(getQuiz).post(makeQuiz);

export default quizRouter;
