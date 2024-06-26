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
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.set("strictQuery", true);
    mongoose_1.default.set("strictPopulate", false);
    try {
        const connection = yield mongoose_1.default.connect(process.env.MONGODB_URL);
        logger_1.default.info(`MongoDB Connected: ${connection.connection.host}`);
    }
    catch (error) {
        logger_1.default.error(`MongoDB Connection Error: ${error}`);
    }
});
process.on("SIGINT", () => {
    mongoose_1.default.connection.close().finally(() => {
        logger_1.default.info("MongoDB Disconnected", {
            service: "Database",
        });
        process.exit(0);
    });
});
exports.default = connectDb;
