import axios from "axios";
import { Request } from "express";

export type QueryType = {
  type: "transparent" | "anonymous" | "socks4" | "socks5";
};

const proxytype = ["transparent", "anonymous", "socks4", "socks5"];

export const dataFetcher = async (req: Request & { query?: QueryType }) => {
  let fetch_url = `https://proxies24.com/api?token=${process.env.API_KEY}`;

  if (req.query.type) {
    fetch_url = fetch_url + `&type=${req.query.type}`;
  } else {
    return {
      msg: "error",
      description:
        "Please add a query to your request URL. Make your url similar to https://hello.world/?type=socks4",
    };
  }
  if (!proxytype.includes(req.query.type)) {
    return {
      msg: "error",
      description:
        "You entered wrong type of proxy. Check the spelling of your query param.",
    };
  }

  const res = await axios.get(fetch_url);
  return res.data.proxies;
};
