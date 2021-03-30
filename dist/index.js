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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const auth_1 = require("./routes/auth");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const Users_1 = require("./models/Users");
const user_1 = require("./routes/user");
const proxies_1 = require("./routes/proxies");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = __importDefault(require("redis"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const _ = yield typeorm_1.createConnection({
        type: "postgres",
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        logging: !constants_1.__prod__,
        synchronize: true,
        entities: [Users_1.User],
    });
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const RedisClient = redis_1.default.createClient();
    const app = express_1.default();
    app.use(cors_1.default({ origin: "http://localhost:3000", credentials: true }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        saveUninitialized: false,
        store: new RedisStore({
            client: RedisClient,
            disableTTL: true,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            sameSite: "lax",
            httpOnly: true,
            secure: false,
        },
        secret: process.env.COOKIE_SECRET,
        resave: true,
    }));
    app.use(express_1.default.json());
    app.use(helmet_1.default());
    app.use(morgan_1.default("combined"));
    app.use("/v1/auth", auth_1.authRouter);
    app.use("/v1/user", user_1.userRouter);
    app.use("/v1/proxies", proxies_1.proxyRouter);
    app.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.sendFile(path_1.default.dirname(__dirname) + "/static/index.html");
    }));
    app.listen(constants_1.__PORT__, () => {
        console.log(`App listening at http://localhost:${constants_1.__PORT__}`);
    });
});
main().catch((e) => console.log(e.message));
//# sourceMappingURL=index.js.map