import { Schema, model } from "mongoose";
import { ICategory } from "../../interfaces/post";

export const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      lowercase: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = model("Category", categorySchema);
