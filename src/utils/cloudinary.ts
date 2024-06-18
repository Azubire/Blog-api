import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import logger from "./logger";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

logger.info({
  config: cloudinary.config(),
});

const cloudinaryUploadOptions: UploadApiOptions = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

export const uploadFile = async (
  file: ArrayBuffer,
  type: string,
  folder?: string
) => {
  const b64 = Buffer.from(file).toString("base64");

  const dataURI = `data:${type};base64,${b64}`;

  return await cloudinary.uploader.upload(dataURI, {
    ...cloudinaryUploadOptions,
    folder: "blog/" + folder,
  });
};

export const deleteFile = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId, {
    invalidate: true,
  });
};
