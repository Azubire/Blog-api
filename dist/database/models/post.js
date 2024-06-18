"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
exports.postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
    },
    content: {
        type: String,
        required: [true, "content is required"],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "author is required"],
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "category is required"],
    },
    tags: {
        type: [String],
    },
    media: {
        type: {
            type: String,
            enum: ["image", "video"],
        },
        url: String,
    },
    meta: {
        description: String,
        keywords: [String],
        title: String,
    },
    likes: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "User",
    },
    comments: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Comment",
    },
    shares: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.Post = (0, mongoose_1.model)("Post", exports.postSchema);
