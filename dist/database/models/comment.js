"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: [true, "content is required"],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "author is required"],
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "post is required"],
    },
}, {
    timestamps: true,
});
exports.Comment = (0, mongoose_1.model)("Comment", commentSchema);
