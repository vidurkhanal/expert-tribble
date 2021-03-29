import { Router } from "express";
import { User } from "../models/Users";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { betterRequest } from "../types";
import { isAdmin } from "../middlewares/isAdmin";

export const userRouter = Router();

//@ts-ignore
userRouter.get(
  "/who-am-i",
  //@ts-ignore
  isAuthenticated,
  async (req: betterRequest, res) => {
    const user = await User.findOne({ where: { id: req.userID } });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "The JSON Web Token couln't be verified" });
    }
    const { email, fullName, createdDate } = user;
    return res.send({ email, fullName, createdDate });
  }
);

// @ts-ignore
userRouter.delete("/delete", isAdmin, async (req, res) => {
  const id = req?.body?.userID;
  if (!id) {
    return res.status(400).json({ msg: "INVALID REQUEST FORMAT" });
  }
  const user = User.findOne({ where: { id: id } });
  if (!user) {
    return res
      .status(400)
      .json({ msg: "USER COULD NOT BE FOUND IN THE DATABASE" });
  }
  await User.delete({ id });
  return res.status(200).send("DELETION SUCESSFUL");
});
