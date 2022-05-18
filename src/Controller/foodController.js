import Food from "../models/Food";

export const saveFood = async (req, res, next) => {
  const { food } = req.body;

  const newFood = await Food.create(food);

  return res.json({ message: "succeed to make food", food: newFood });
};
