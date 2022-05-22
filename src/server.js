import "dotenv/config";
import express from "express";
import logger from "morgan";
import createError from "http-errors";
import cors from "cors";
import "./db";
import router from "./routes";

import "regenerator-runtime";

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.use(function (req, res, next) {
  console.log(req, "req");
  next(createError(404, "Can not find the page you request"));
});

app.use(function (err, req, res, next) {
  const message =
    req.app.get("env") === "development"
      ? err.message
      : "Internal Server Error";
  res.status(err.status || 500);
  res.json({ error: message });
});

const handleListen = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListen);
