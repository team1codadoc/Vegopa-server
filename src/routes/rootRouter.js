import express from "express";

const rootRouter = express.Router();

const getMain = (req, res, next) => {
  return res.json({ result: "ok", message: "this is main api" });
};

rootRouter.get("/", getMain);

export default rootRouter;
