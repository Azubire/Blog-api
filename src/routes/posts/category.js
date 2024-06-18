"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_router_1 = __importDefault(require("restify-router"));
const authenticate_1 = require("../../middleware/authenticate");
const categoryController_1 = require("../../controllers/categoryController");
const category = new restify_router_1.default.Router();
category.get("/", categoryController_1.getCategories);
category.post("/", authenticate_1.authenticate, categoryController_1.createCategory);
exports.default = category;
