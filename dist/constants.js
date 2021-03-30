"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_NAME = exports.ADMIN_PWD = exports.__prod__ = exports.__PORT__ = void 0;
exports.__PORT__ = 3000;
exports.__prod__ = process.env.NODE_ENV === "production";
exports.ADMIN_PWD = process.env.ADMIN_PASSWORD;
exports.COOKIE_NAME = "exodus_authKey";
//# sourceMappingURL=constants.js.map