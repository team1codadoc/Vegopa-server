import Party from "../models/Party";
import User from "../models/User";
import parseToken from "../utils/token";
import jwt from "jsonwebtoken";
import { STATUS_CODES, ERROR_MESSAGE } from "../Constants/error";

const secret = process.env.SECRET_KEY;

export const saveParty = async (req, res, next) => {
  const authorization = req.get("Authorization");
  const { title, image, total, taste, meetingDate, location, coordinates } =
    req.body;

  try {
    const accessToken = parseToken(authorization);
    const decoded = jwt.verify(accessToken, secret);
    const { id } = decoded;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "can not find User" });
    }

    const newParty = await Party.create({
      title,
      image,
      creator: id,
      total,
      taste,
      meetingDate,
      location,
      coordinates,
    });

    return res.json({ result: "ok", party: newParty });
  } catch (err) {
    console.log(err, "error");
  }
};

export const getParties = async (req, res, next) => {
  const allParties = await Party.find().lean();

  return res.json({ party: allParties });
};

export const getParty = async (req, res, next) => {
  const { partyName } = req.params;

  if (!partyName) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: ERROR_MESSAGE.PARTY.NOT_FOUND });
  }

  const party = await Party.find({ title: partyName });

  return res.json({ result: "ok", party });
};
