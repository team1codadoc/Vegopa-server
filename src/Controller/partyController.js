import Party from "../models/Party";
import User from "../models/User";
import parseToken from "../utils/token";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;

export const saveParty = async (req, res, next) => {
  const authorization = req.get("Authorization");
  const {
    title,
    image,
    creator,
    total,
    taste,
    meetingDate,
    location,
    coordinates,
  } = req.body;

  try {
    const accessToken = parseToken(authorization);
    const decoded = jwt.verify(accessToken, secretKey);
    const { idx } = decoded;

    const user = await User.findById(idx);

    if (!user) {
      return res.status(404).json({ message: "can not find User" });
    }
  } catch (err) {
    console.log(err, "error");
  }
  //creator 배열 push 아이디
};
