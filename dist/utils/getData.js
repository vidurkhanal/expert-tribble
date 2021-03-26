"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataFetcher = void 0;
const axios_1 = __importDefault(require("axios"));
const proxytype = ["transparent", "anonymous", "socks4", "socks5"];
const dataFetcher = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let fetch_url = `https://proxies24.com/api?token=${process.env.API_KEY}`;
    if (req.query.type) {
        fetch_url = fetch_url + `&type=${req.query.type}`;
    }
    else {
        return {
            msg: "error",
            description: "Please add a query to your request URL. Make your url similar to https://hello.world/?type=socks4",
        };
    }
    if (!proxytype.includes(req.query.type)) {
        return {
            msg: "error",
            description: "You entered wrong type of proxy. Check the spelling of your query param.",
        };
    }
    const res = yield axios_1.default.get(fetch_url);
    return res.data.proxies;
});
exports.dataFetcher = dataFetcher;
//# sourceMappingURL=getData.js.map