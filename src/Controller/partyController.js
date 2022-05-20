import Party from "../models/Party";
import User from "../models/User";
import parseToken from "../utils/token";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;

export const saveParty = async (req, res, next) => {
  const authorization = req.get("Authorization");
  const { title, image, total, taste, meetingDate, location, coordinates } =
    req.body;

  try {
    const accessToken = parseToken(authorization);
    const decoded = jwt.verify(accessToken, secretKey);
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
