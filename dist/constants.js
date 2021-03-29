"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_PWD = exports.TOKEN_NAME = exports.__prod__ = exports.__PORT__ = void 0;
exports.__PORT__ = 3000;
exports.__prod__ = process.env.NODE_ENV === "production";
exports.TOKEN_NAME = "auth_token";
exports.ADMIN_PWD = process.env.ADMIN_PASSWORD;
//# sourceMappingURL=constants.js.map