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
exports.postComments = exports.commentPost = exports.sharePost = exports.unlikePost = exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getUserPosts = exports.getPosts = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const post_1 = require("../database/models/post");
const postService_1 = require("../services/postService");
const comment_1 = require("../database/models/comment");
const cloudinary_1 = require("../utils/cloudinary");
const node_fs_1 = __importDefault(require("node:fs"));
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const posts = yield (0, postService_1.getPostsHandler)(limit, offset);
        const total = yield post_1.Post.countDocuments({});
        const totalPages = Math.ceil(total / limit);
        res.json({
            success: true,
            message: "Posts fetched successfully",
            data: {
                posts,
                pagination: {
                    page,
                    totalPages,
                    total,
                    limit: limit,
                    previousPage: page > 1 ? page - 1 : undefined,
                    nextPage: page < totalPages ? page + 1 : undefined,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1,
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getPosts = getPosts;
const getUserPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, postService_1.getUserPostsHandler)(req.session.user._id);
        res.json({
            success: true,
            message: "Posts fetched successfully",
            data: { posts },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserPosts = getUserPosts;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info({ params: req.params });
        const post = yield (0, postService_1.getPostHandler)(req.params.id);
        res.json({
            success: true,
            message: "Post fetched successfully",
            data: {
                post,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getPost = getPost;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const postData = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            tags: (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b.split(","),
            meta: {
                title: (_c = req.body) === null || _c === void 0 ? void 0 : _c.metaTitle,
                description: (_d = req.body) === null || _d === void 0 ? void 0 : _d.metaDescription,
                keywords: (_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.tags) === null || _f === void 0 ? void 0 : _f.split(","),
            },
        };
        if (req.files && req.files.media && req.files.media) {
            const filePath = req.files.media.path;
            const arrayBuffer = node_fs_1.default.readFileSync(filePath);
            const file = yield (0, cloudinary_1.uploadFile)(arrayBuffer, req.files.media.type, "posts");
            logger_1.default.info({ file });
            postData.media = {
                url: file.secure_url,
                type: file.resource_type,
            };
        }
        const post = yield (0, postService_1.createPostHandler)(Object.assign(Object.assign({}, postData), { author: req.session.user }));
        res.json({
            success: true,
            message: "Post created successfully",
            post,
        });
    }
    catch (error) {
        logger_1.default.info({ error });
        next(error);
    }
});
exports.createPost = createPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield (0, postService_1.updatePostHandler)(req.params.id, req.body);
        res.json({
            success: true,
            message: "Post updated successfully",
            updatedPost,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, postService_1.deletePostHandler)(req.params.id);
        res.json({
            success: true,
            message: "Post deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePost = deletePost;
const likePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.Post.findByIdAndUpdate(req.params.id, {
            $addToSet: {
                likes: req.session.user._id,
            },
        }, {
            new: true,
        });
        res.json({
            success: true,
            message: "Post liked successfully",
            post,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.likePost = likePost;
const unlikePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.Post.findByIdAndUpdate(req.params.id, {
            $pull: {
                likes: req.session.user._id,
            },
        }, {
            new: true,
        });
        res.json({
            success: true,
            message: "Post unliked successfully",
            post,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.unlikePost = unlikePost;
const sharePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.Post.findByIdAndUpdate(req.params.id, {
            $inc: {
                shares: 1,
            },
        }, {
            new: true,
        });
        res.json({
            success: true,
            message: "Post shared successfully",
            post,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.sharePost = sharePost;
const commentPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            content: req.body.content,
            author: req.session.user._id,
            post: req.params.id,
        };
        const comment = yield comment_1.Comment.create(data);
        const post = yield post_1.Post.findByIdAndUpdate(req.params.id, {
            $push: {
                comments: comment._id,
            },
        }, {
            new: true,
        });
        res.json({
            success: true,
            message: "Post commented successfully",
            post,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.commentPost = commentPost;
const postComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield comment_1.Comment.find({
            post: req.params.id,
        }).populate("author");
        res.json({
            success: true,
            message: "Comments fetched successfully",
            data: { comments },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.postComments = postComments;
