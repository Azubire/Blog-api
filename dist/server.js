"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const restify_1 = __importDefault(require("restify"));
const database_1 = __importDefault(require("./database"));
const logger_1 = __importDefault(require("./utils/logger"));
const api_1 = __importDefault(require("./routes/api"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const mongoose_1 = __importDefault(require("mongoose"));
const restify_cors_middleware2_1 = __importDefault(require("restify-cors-middleware2"));
dotenv_1.default.config();
(0, database_1.default)().then(() => {
    // Create server
    const server = restify_1.default.createServer({
        name: "Syncline API",
        version: "1.0.0",
        ignoreTrailingSlash: true,
    });
    // middleware
    const cors = (0, restify_cors_middleware2_1.default)({
        origins: ["http://localhost:5173"],
        credentials: true,
    });
    server.pre(cors.preflight);
    server.use(cors.actual);
    server.use(restify_1.default.plugins.throttle({ burst: 5, rate: 0.5, ip: true }));
    server.use(restify_1.default.plugins.bodyParser());
    // server.use(restify.plugins.multipartBodyParser());
    server.use((0, morgan_1.default)("dev"));
    // session
    server.use(
    // @ts-ignore
    (0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 5 * 60 * 60 * 1000,
            secure: false,
            httpOnly: true,
        },
        store: connect_mongo_1.default.create({ client: mongoose_1.default.connection.getClient() }),
    }));
    // Routes
    api_1.default.applyRoutes(server, "/api");
    server.listen(process.env.PORT || 8000, () => {
        logger_1.default.info(`Server running on port ${process.env.PORT || 8000}`);
    });
});
