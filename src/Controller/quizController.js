import Quiz from "../models/Quiz";

export const makeQuiz = async (req, res, next) => {
  const { selects } = req.body;
  const quiz = await Quiz.create({ selects });
  return res.json({ results: "ok", message: "succeed to make quiz", quiz });
};

export const getQuiz = async (req, res, next) => {
  const quiz = await Quiz.find({}).lean();

  return res.json({ quiz });
};
