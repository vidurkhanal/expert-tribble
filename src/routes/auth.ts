import { Router } from "express";
import { User } from "../models/Users";
import { hash, verify } from "argon2";
import { getConnection } from "typeorm";
import { LoginValidation, RegistrationValidation } from "../utils/validation";
import jwt from "jsonwebtoken";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  let user: User | null = null;
  const email = req?.body.email;
  const fullName = req?.body.fullName;
  const password = req?.body.password;

  const { error } = RegistrationValidation({ email, fullName, password });
  if (error) {
    return res.status(400).json(error?.details);
  }

  const hashedPassword = await hash(password);
  try {
    let result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        fullName,
        email,
        password: hashedPassword,
      })
      .returning("*")
      .execute();
    user = result.raw[0];
  } catch (e) {
    if (e.code === "23505") {
      return res.status(400).json({
        message: '"email" is already present in the database',
        path: ["email"],
        type: "string.email",
        context: {
          value: email,
          invalids: [email],
          label: "email",
          key: "email",
        },
      });
    }
  }
  return res.json({
    user: user?.id,
  });
});

authRouter.get("/allusers", async (_, res) => {
  return res.json(await User.find({}));
});

authRouter.post("/login", async (req, res) => {
  const email = req?.body.email;
  const password = req?.body.password;

  const { error } = LoginValidation({ email, password });
  if (error) {
    return res.status(400).json(error?.details);
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({
      message: '"email" is not registered',
      path: ["email"],
      type: "string.email",
      context: {
        value: email,
        invalids: [email],
        label: "email",
        key: "email",
      },
    });
  }

  const isValidPassword = await verify(user.password, password);
  if (!isValidPassword) {
    return res.status(400).json({
      message: '"password" is not correct',
      path: ["password"],
      type: "string.password",
      context: {
        value: password,
        invalids: [password],
        label: "password",
        key: "password",
      },
    });
  }
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET as string);

  return res.header({ auth_token: token }).json({
    token,
  });
});
