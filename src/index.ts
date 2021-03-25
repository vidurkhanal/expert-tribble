import express from "express";
import "dotenv/config";
import { dataFetcher } from "./DataFetcher/getData";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

const main = async () => {
  // INITIALIZE THE APP
  const app = express();
  const port = 3000;

  // MIDDLE WARES
  app.use(helmet());
  app.use(cors());
  app.use(morgan("combined"));

  // ROUTES
  app.get("/", async (_, res) => {
    return res.sendFile(path.dirname(__dirname) + "/static/index.html");
  });

  app.get("/v1/getproxies", async (req, res) => {
    //@ts-ignore
    return res.send(await dataFetcher(req));
  });

  // START THE APP
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
};

main().catch((e) => console.log(e.message));
