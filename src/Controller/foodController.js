import { ERROR_MESSAGE } from "../Constants/error";
import Food from "../models/Food";

export const saveFood = async (req, res, next) => {
  const { food } = req.body;

  const newFood = await Food.create(food);

  return res.json({ message: "succeed to make food", food: newFood });
};

export const getFoods = async (req, res, next) => {
  const foods = await Food.find({}).lean();

  return res.json({ foods });
};
