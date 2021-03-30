"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const constants_1 = require("../constants");
const isAdmin = (req, res, next) => {
    const token = req.body.ADMIN_PASSWORD;
    if (!token) {
        return res.status(401).json({
            msg: "YOU ARE NOT AUTHENTICATED TO PERFORM THE REQUESTED ACTION",
        });
    }
    const isAdminis = token === constants_1.ADMIN_PWD;
    if (!isAdminis) {
        return res.status(401).json({
            msg: "INCORRECT ADMINISTRATOR PASSWORD",
        });
    }
    return next();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=isAdmin.js.map