import { ADMIN_PWD } from "../constants";
import { betterRequest, betterResponse } from "../types";

export const isAdmin = (req: betterRequest, res: betterResponse, next: any) => {
  const token = req.body.ADMIN_PASSWORD;
  if (!token) {
    return res.status(401).json({
      msg: "YOU ARE NOT AUTHENTICATED TO PERFORM THE REQUESTED ACTION",
    });
  }
  const isAdminis = token === ADMIN_PWD;
  if (!isAdminis) {
    return res.status(401).json({
      msg: "INCORRECT ADMINISTRATOR PASSWORD",
    });
  }
  return next();
};
