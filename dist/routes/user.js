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
exports.userRouter = void 0;
const express_1 = require("express");
const Users_1 = require("../models/Users");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAdmin_1 = require("../middlewares/isAdmin");
exports.userRouter = express_1.Router();
exports.userRouter.get("/who-am-i", isAuthenticated_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.User.findOne({ where: { id: req.userID } });
    if (!user) {
        return res
            .status(400)
            .json({ msg: "The JSON Web Token couln't be verified" });
    }
    const { email, fullName, createdDate } = user;
    return res.send({ email, fullName, createdDate });
}));
exports.userRouter.delete("/delete", isAdmin_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userID;
    if (!id) {
        return res.status(400).json({ msg: "INVALID REQUEST FORMAT" });
    }
    const user = Users_1.User.findOne({ where: { id: id } });
    if (!user) {
        return res
            .status(400)
            .json({ msg: "USER COULD NOT BE FOUND IN THE DATABASE" });
    }
    yield Users_1.User.delete({ id });
    return res.status(200).send("DELETION SUCESSFUL");
}));
//# sourceMappingURL=user.js.map