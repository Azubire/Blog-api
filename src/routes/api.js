"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_router_1 = __importDefault(require("restify-router"));
const auth_1 = __importDefault(require("./auth"));
const posts_1 = __importDefault(require("./posts"));
const category_1 = __importDefault(require("./posts/category"));
const authenticate_1 = require("../middleware/authenticate");
const postController_1 = require("../controllers/postController");
const api = new restify_router_1.default.Router();
api.get("/", authenticate_1.authenticate, (req, res, next) => {
    res.status(200);
    res.json({
        success: true,
        message: "Welcome to Syncline Blog API v1.0.0 ⚡⚡⚡",
    });
});
// auth routes
api.add("/auth", auth_1.default);
// category routes
api.add("/categories", category_1.default);
api.get("/author-posts", postController_1.getUserPosts);
// post routes
api.add("/posts", posts_1.default);
// admin routes
api.add("/admin", auth_1.default);
exports.default = api;
