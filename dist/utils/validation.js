"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidation = exports.RegistrationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const RegistrationValidation = (data) => {
    const schema = joi_1.default.object({
        fullName: joi_1.default.string().min(2).required(),
        email: joi_1.default.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "co", "black"] },
        }),
        password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(data);
};
exports.RegistrationValidation = RegistrationValidation;
const LoginValidation = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "co", "black"] },
        }),
        password: joi_1.default.string().min(2).required(),
    });
    return schema.validate(data);
};
exports.LoginValidation = LoginValidation;
//# sourceMappingURL=validation.js.map