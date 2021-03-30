"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const Users_1 = require("../models/Users");
const isAuthenticated = (req, res, next) => {
    const userID = req.session.userId;
    if (!userID) {
        return res
            .status(401)
            .json({ msg: "User not authenticated. Please authenticate the user." });
    }
    const user = Users_1.User.findOne({ where: { id: userID } });
    if (!user) {
        return res.status(400).json({ msg: "User cannot be found." });
    }
    req.user = user;
    return next();
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map