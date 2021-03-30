import { User } from "../models/Users";
import { betterRequest, betterResponse } from "../types";

export const isAuthenticated = (
  req: betterRequest,
  res: betterResponse,
  next: any
) => {
  const userID = req.session.userId;
  if (!userID) {
    return res
      .status(401)
      .json({ msg: "User not authenticated. Please authenticate the user." });
  }
  const user = User.findOne({ where: { id: userID } });
  if (!user) {
    return res.status(400).json({ msg: "User cannot be found." });
  }
  // @ts-ignore
  req.user = user;
  return next();
};
