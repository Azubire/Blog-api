"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const authSignup = joi_1.default.object({
    userName: joi_1.default.string().required().label("username"),
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: joi_1.default.string().required(),
});
const authLogin = joi_1.default.object({
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: joi_1.default.string().required(),
});
exports.default = {
    "auth/signup": authSignup,
    "auth/signin": authLogin,
};
