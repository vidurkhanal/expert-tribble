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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const Users_1 = require("../models/Users");
const argon2_1 = require("argon2");
const typeorm_1 = require("typeorm");
const validation_1 = require("../utils/validation");
exports.authRouter = express_1.Router();
exports.authRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = null;
    const email = req === null || req === void 0 ? void 0 : req.body.email;
    const fullName = req === null || req === void 0 ? void 0 : req.body.fullName;
    const password = req === null || req === void 0 ? void 0 : req.body.password;
    const { error } = validation_1.RegistrationValidation({ email, fullName, password });
    if (error) {
        return res.status(400).json(error === null || error === void 0 ? void 0 : error.details);
    }
    const hashedPassword = yield argon2_1.hash(password);
    try {
        let result = yield typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(Users_1.User)
            .values({
            fullName,
            email,
            password: hashedPassword,
        })
            .returning("*")
            .execute();
        user = result.raw[0];
    }
    catch (e) {
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
        user: user === null || user === void 0 ? void 0 : user.id,
    });
}));
exports.authRouter.get("/allusers", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield Users_1.User.find({}));
}));
exports.authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req === null || req === void 0 ? void 0 : req.body.email;
    const password = req === null || req === void 0 ? void 0 : req.body.password;
    const { error } = validation_1.LoginValidation({ email, password });
    if (error) {
        return res.status(400).json(error === null || error === void 0 ? void 0 : error.details);
    }
    const user = yield Users_1.User.findOne({ where: { email } });
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
    const isValidPassword = yield argon2_1.verify(user.password, password);
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
    return res.json({
        user: user.id,
    });
}));
//# sourceMappingURL=auth.js.map