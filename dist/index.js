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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const getData_1 = require("./DataFetcher/getData");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    const port = 3000;
    app.use(helmet_1.default());
    app.use(cors_1.default());
    app.use(morgan_1.default("combined"));
    app.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.sendFile(path_1.default.dirname(__dirname) + "/static/index.html");
    }));
    app.get("/v1/getproxies", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.send(yield getData_1.dataFetcher(req));
    }));
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
});
main().catch((e) => console.log(e.message));
//# sourceMappingURL=index.js.map