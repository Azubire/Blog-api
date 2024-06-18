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
exports.deleteFile = exports.uploadFile = void 0;
const cloudinary_1 = require("cloudinary");
const logger_1 = __importDefault(require("./logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
logger_1.default.info({
    config: cloudinary_1.v2.config(),
});
const cloudinaryUploadOptions = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
};
const uploadFile = (file, type, folder) => __awaiter(void 0, void 0, void 0, function* () {
    const b64 = Buffer.from(file).toString("base64");
    const dataURI = `data:${type};base64,${b64}`;
    return yield cloudinary_1.v2.uploader.upload(dataURI, Object.assign(Object.assign({}, cloudinaryUploadOptions), { folder: "blog/" + folder }));
});
exports.uploadFile = uploadFile;
const deleteFile = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cloudinary_1.v2.uploader.destroy(publicId, {
        invalidate: true,
    });
});
exports.deleteFile = deleteFile;
