import { STATUS_CODES, ERROR_MESSAGE } from "../Constants/error";
import User from "../models/User";

export const signup = async (req, res, next) => {
  const { email, password, username, avatar, level } = req.body;

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
    const existAccount = await User.exists({ username });
    const existEmail = await User.exists({ email });

    if (existAccount) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: ERROR_MESSAGE.SIGN_UP.INVALID_ACCOUNT });
    }

    if (existEmail) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: ERROR_MESSAGE.SIGN_UP.INVALID_EMAIL });
    }

    const user = await User.create({
      email,
      password,
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

export const login = async (req, res, next) => {};
