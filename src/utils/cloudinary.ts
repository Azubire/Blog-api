import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadOptions: UploadApiOptions = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

export const uploadFile = async (file: File, folder?: string) => {
  const arrayBuffer = await file.arrayBuffer();
  const b64 = Buffer.from(arrayBuffer).toString("base64");

  const dataURI = `data:${file.type};base64,${b64}`;

  return await cloudinary.uploader.upload(dataURI, {
    ...cloudinaryUploadOptions,
    folder: "awunpara-marketplace/" + folder,
  });
};

export const deleteFile = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId, {
    invalidate: true,
  });
};
