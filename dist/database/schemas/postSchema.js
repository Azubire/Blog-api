"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createPost = joi_1.default.object({
    title: joi_1.default.string().required().label("title"),
    content: joi_1.default.string().required().label("content"),
    category: joi_1.default.string().required().label("category"),
    media: joi_1.default.any().label("media"),
    tags: joi_1.default.any().label("tags"),
    metaTitle: joi_1.default.any().label("metaTitle").optional(),
    metaDescription: joi_1.default.any().label("metaDescription").optional(),
    metaKeywords: joi_1.default.any().label("metaKeywords").optional(),
});
const updatePost = joi_1.default.object({
    title: joi_1.default.string().label("title"),
    content: joi_1.default.string().label("content"),
    category: joi_1.default.string().label("category"),
    media: joi_1.default.any().label("tags"),
    tags: joi_1.default.string().label("tags"),
    metaTitle: joi_1.default.string().label("meta"),
    metaDescription: joi_1.default.string().label("meta"),
    metaKeywords: joi_1.default.string().label("meta"),
});
exports.default = {
    "post/create": createPost,
    "post/update": updatePost,
};
