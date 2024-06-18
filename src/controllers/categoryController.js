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
exports.createCategory = exports.getCategories = void 0;
const category_1 = require("../database/models/category");
const logger_1 = __importDefault(require("../utils/logger"));
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.Category.find();
        res.json({
            success: true,
            message: "Categories fetched successfully",
            data: categories,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCategories = getCategories;
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info({
        body: req.body,
    });
    try {
        const category = yield category_1.Category.create({
            name: req.body.name,
        });
        res.send({
            success: true,
            message: "Category created successfully",
            category,
        });
    }
    catch (error) {
        logger_1.default.info({
            error: error,
        });
        return next(error);
    }
});
exports.createCategory = createCategory;
