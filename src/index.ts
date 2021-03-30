import "reflect-metadata";
import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { authRouter } from "./routes/auth";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __PORT__, __prod__ } from "./constants";
import { User } from "./models/Users";
import { userRouter } from "./routes/user";
import { proxyRouter } from "./routes/proxies";
import session from "express-session";
import connRedis from "connect-redis";
import redis from "redis";

const main = async () => {
  const _ = await createConnection({
    type: "postgres",
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: !__prod__,
    synchronize: true,
    entities: [User],
  });

  const RedisStore = connRedis(session);
  const RedisClient = redis.createClient();

  // await User.delete({});

  // INITIALIZE THE APP
  const app = express();
  app.use(cors({ credentials: true }));

  app.use(
    session({
      name: COOKIE_NAME,
      saveUninitialized: false,
      store: new RedisStore({
        client: RedisClient,
        disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        sameSite: "lax",
        httpOnly: true, //CAN'T BE ACCESSED BY FRONTEND
        secure: __prod__,
      },
      secret: process.env.COOKIE_SECRET as string,
      resave: true,
    })
  );

  // MIDDLE WARES
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("combined"));

  // ROUTES
  app.use("/v1/auth", authRouter);
  app.use("/v1/user", userRouter);
  app.use("/v1/proxies", proxyRouter);
  app.get("/", async (_, res) => {
    return res.sendFile(path.dirname(__dirname) + "/static/index.html");
  });

  // START THE APP
  app.listen(__PORT__, () => {
    console.log(`App listening at http://localhost:${__PORT__}`);
  });
};

main().catch((e) => console.log(e.message));
