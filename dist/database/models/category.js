"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.categorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        lowercase: true,
        unique: true,
    },
}, {
    timestamps: true,
});
exports.Category = (0, mongoose_1.model)("Category", exports.categorySchema);
