import { Router } from "express";
import { dataFetcher } from "../utils/getData";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const proxyRouter = Router();

//@ts-ignore
proxyRouter.get("/", isAuthenticated, async (req, res) => {
  //@ts-ignore
  return res.send(await dataFetcher(req));
});
