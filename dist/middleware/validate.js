"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const index_1 = require("../database/schemas/index");
const restify_errors_1 = __importDefault(require("restify-errors"));
const logger_1 = __importDefault(require("../utils/logger"));
const allowedMethods = ["post", "put", "patch", "delete"];
const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // allow unknown properties
    stripUnknown: true, // remove unknown properties
};
const validate = (route) => (req, res, next) => {
    var _a;
    const method = (_a = req === null || req === void 0 ? void 0 : req.method) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (method && !allowedMethods.includes(method)) {
        logger_1.default.info("inside");
        return next(new restify_errors_1.default.MethodNotAllowedError());
    }
    const schema = index_1.schemas[route];
    if (!schema) {
        const error = new Error(`Schema not found for ${route}`);
        return next(error);
    }
    const { error, value } = schema.validate(req.body, options);
    // logger.error({ error });
    // logger.info({ value });
    if (error) {
        const message = error.details.map(({ message, path, type }) => ({
            message: message.replace(/"/g, ""),
            path: path[0],
        }));
        return next(new restify_errors_1.default.UnprocessableEntityError(message.map((m) => m.message).join(", ")));
    }
    req.body = value;
    return next();
};
exports.validate = validate;
