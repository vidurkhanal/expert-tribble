"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const constants_1 = require("../constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    const token = req.header(constants_1.TOKEN_NAME);
    if (!token) {
        return res.status(401).json({
            msg: "YOU ARE NOT AUTHENTICATED TO PERFORM THE REQUESTED ACTION",
        });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.userID = verified === null || verified === void 0 ? void 0 : verified.id;
    }
    catch (err) {
        return res.status(400).json({ msg: "Invalid JSON Web Token." });
    }
    return next();
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map