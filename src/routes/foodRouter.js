import express from "express";
import Food from "../models/Food";
import { saveFood } from "../Controller/foodController";

const foodRouter = express.Router();

foodRouter.route("/").post(saveFood);

export default foodRouter;
