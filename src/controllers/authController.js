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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signin = exports.signup = void 0;
const user_1 = require("../database/models/user");
const logger_1 = __importDefault(require("../utils/logger"));
const http_1 = require("../shared/enums/http");
const authService_1 = require("../services/auth/authService");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check if user already exists
        const existingUser = yield (0, authService_1.getUserByUserName)(req.body.userName);
        if (existingUser) {
            logger_1.default.error(`User: ${existingUser.email} already exists`, {
                service: "User signup",
            });
            res.status(http_1.HTTPStatusCode.Conflict);
            throw new Error("User already exists");
        }
        //new user proceed
        const user = yield user_1.User.create(Object.assign(Object.assign({}, req.body), { role: "user" }));
        logger_1.default.info(`User: ${user.email} created successfully`, {
            service: "User signup",
        });
        //send Welcome mail
        res.status(http_1.HTTPStatusCode.Created);
        res.json({
            success: true,
            message: "User created successfully",
        });
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //try finding user
        const user = yield user_1.User.findOne({ email: req.body.email }).select([
            "+password",
        ]);
        if (!user) {
            logger_1.default.error(`User: ${req.body.email} not found`, {
                service: "User login",
            });
            res.status(http_1.HTTPStatusCode.NotFound);
            throw new Error(`Incorrect credentials`);
        }
        const isMatch = yield user.comparePassword(req.body.password);
        if (!isMatch) {
            logger_1.default.error(`Incorrect password for user: ${req.body.email}`, {
                service: "User login",
            });
            res.status(http_1.HTTPStatusCode.BadRequest);
            throw new Error("Incorrect credentials");
        }
        logger_1.default.info(`User: ${user.email} logged in successfully`, {
            service: "User login",
        });
        req.session.regenerate(function (err) {
            if (err)
                throw new Error(err);
        });
        req.session.user = {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role,
        };
        req.session.save(function (err) {
            if (err)
                throw new Error(err);
        });
        res.json({
            success: true,
            message: "logged in successfully",
            data: {
                userName: user.userName,
                email: user.email,
                role: user.role,
                _id: user._id,
            },
        });
        logger_1.default.info({
            session: req.session,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signin = signin;
const logout = (req, res, next) => {
    try {
        req.session.user = null;
        req.session.destroy((err) => {
            if (err) {
                throw new Error(err);
            }
        });
        res.json({
            success: true,
            message: "logged out successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
