"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_router_1 = __importDefault(require("restify-router"));
const authController_1 = require("../../controllers/authController");
const validate_1 = require("../../middleware/validate");
const authenticate_1 = require("../../middleware/authenticate");
const auth = new restify_router_1.default.Router();
auth.post("/signin", (0, validate_1.validate)("auth/signin"), authController_1.signin);
auth.post("/signup", (0, validate_1.validate)("auth/signup"), authController_1.signup);
auth.get("/logout", authenticate_1.authenticate, authController_1.logout);
exports.default = auth;
