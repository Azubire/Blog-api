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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostHandler = exports.updatePostHandler = exports.getUserPostsHandler = exports.getPostsHandler = exports.getPostHandler = exports.createPostHandler = void 0;
const post_1 = require("../database/models/post");
const createPostHandler = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_1.Post.create(Object.assign({}, data));
    return post;
});
exports.createPostHandler = createPostHandler;
const getPostHandler = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_1.Post.findById(id);
    return post;
});
exports.getPostHandler = getPostHandler;
const getPostsHandler = (limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_1.Post.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(offset);
    return posts;
});
exports.getPostsHandler = getPostsHandler;
const getUserPostsHandler = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_1.Post.find({ author: id })
        .sort({ createdAt: -1 })
        .populate("category", "author");
    return posts;
});
exports.getUserPostsHandler = getUserPostsHandler;
const updatePostHandler = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_1.Post.findByIdAndUpdate(id, data, { new: true }).populate("author", "category");
    return post;
});
exports.updatePostHandler = updatePostHandler;
const deletePostHandler = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_1.Post.findByIdAndDelete(id);
    return post;
});
exports.deletePostHandler = deletePostHandler;
