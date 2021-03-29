import { TOKEN_NAME } from "../constants";
import jwt from "jsonwebtoken";
import { betterRequest, betterResponse } from "../types";

export const isAuthenticated = (
  req: betterRequest,
  res: betterResponse,
  next: any
) => {
  const token = req.header(TOKEN_NAME);
  if (!token) {
    return res.status(401).json({
      msg: "YOU ARE NOT AUTHENTICATED TO PERFORM THE REQUESTED ACTION",
    });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
    // @ts-ignore
    req.userID = verified?.id as string;
  } catch (err) {
    return res.status(400).json({ msg: "Invalid JSON Web Token." });
  }
  return next();
};
