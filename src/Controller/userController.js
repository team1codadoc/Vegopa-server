import User from "../models/User";
import { STATUS_CODES, ERROR_MESSAGE } from "../Constants/error";
import createError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;

export const signup = async (req, res, next) => {
  const { email, password, username, avatar, level } = req.body;
  console.log(username, "username");

  const accountReg = /^[_A-Za-z0-9+]*$/;
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

  if (!emailReg.test(email)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.SIGN_UP.CHECK_EMAIL,
    });
  }

  if (password.length < 6) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.SIGN_UP.CHECK_PASSWORD,
    });
  }

  if (!accountReg.test(username)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.SIGN_UP.INVALID_ACCOUNT,
    });
  }

  try {
    const existEmail = await User.exists({ email });
    const existAccount = await User.exists({ username });

    if (existEmail) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: ERROR_MESSAGE.SIGN_UP.INVALID_EMAIL });
    }

    if (existAccount) {
      console.log("계정있는 경우다!!");
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: ERROR_MESSAGE.SIGN_UP.INVALID_ACCOUNT });
    }

    const user = await User.create({
      email,
      password,
      username,
      avatar,
      level: level ? level : 1,
    });

    res.json({ message: "회원가입 성공", user });
  } catch (error) {
    next(error);
  }
};

export const emailValid = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: ERROR_MESSAGE.EMAIL_VALID.EXIST_EMAIL,
      });
    } else {
      res.json({
        message: "사용 가능한 이메일 입니다.",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const accountValid = async (req, res, next) => {
  const { username } = req.body;

  try {
    const existAccount = await Profile.findOne({ username });

    if (existAccount) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: ERROR_MESSAGE.ACCOUNT_VALID.EXIST_ACCOUNT,
      });
    } else {
      res.json({
        message: "사용 가능한 닉네임 입니다.",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.LOGIN_IN.CHECK_EMAIL,
    });
  }

  if (!password) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.LOGIN_IN.CHECK_PASSWORD,
    });
  }

  if (!(email && password)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: ERROR_MESSAGE.LOGIN_IN.CHECK_CONTENT,
    });
  }
  try {
    const user = await User.findOne({ email });

    if (user === null) {
      next(
        createError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGE.LOGIN_IN.INVALID_USER)
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      const secret = process.env.SECRET_KEY;
      const ISSUER = "Vegopayu";
      const payload = {
        idx: user._id,
        email: user.email,
      };

      const token = jwt.sign(payload, secret, {
        issuer: ISSUER,
      });

      const userInfo = {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        token,
      };

      return res.status(200).json({
        user: userInfo,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = async (req, res, next) => {
  const authorization = req.get("Authorization");

  try {
    const accessToken = parseToken(authorization);
    const decoded = jwt.verify(accessToken, secretKey);
    const { idx } = decoded;

    const user = await User.findById(idx).populate("bookmark");

    if (!user) {
      return res.status(404).json({ message: "can not find User" });
    }

    return res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        level: user.level,
        bookmark: user.bookmark,
      },
    });
  } catch (error) {
    console.log(error, "error");
  }
};
