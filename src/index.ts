import "reflect-metadata";
import express from "express";
import "dotenv/config";
import { dataFetcher } from "./utils/getData";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { authRouter } from "./routes/auth";
import { createConnection } from "typeorm";
import { __PORT__, __prod__ } from "./constants";
import { User } from "./models/Users";
import { userRouter } from "./routes/user";
import { proxyRouter } from "./routes/proxies";

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

  // await User.delete({});

  // INITIALIZE THE APP
  const app = express();

  // MIDDLE WARES
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(morgan("combined"));

  // ROUTES
  app.use("/v1/auth", authRouter);
  app.use("/v1/user", userRouter);
  app.use("/v1/proxies", proxyRouter);
  app.get("/", async (_, res) => {
    return res.sendFile(path.dirname(__dirname) + "/static/index.html");
  });

  app.get("/v1/getproxies", async (req, res) => {
    //@ts-ignore
    return res.send(await dataFetcher(req));
  });

  // START THE APP
  app.listen(__PORT__, () => {
    console.log(`App listening at http://localhost:${__PORT__}`);
  });
};

main().catch((e) => console.log(e.message));
