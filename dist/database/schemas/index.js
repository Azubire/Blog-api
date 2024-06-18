"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = void 0;
const authSchema_1 = __importDefault(require("./authSchema"));
const postSchema_1 = __importDefault(require("./postSchema"));
exports.schemas = Object.assign(Object.assign({}, authSchema_1.default), postSchema_1.default);
