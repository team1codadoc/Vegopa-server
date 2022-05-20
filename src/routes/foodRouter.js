import express from "express";
import Food from "../models/Food";
import { getFoods, saveFood } from "../Controller/foodController";

const foodRouter = express.Router();

foodRouter.route("/").post(saveFood).get(getFoods);

export default foodRouter;
